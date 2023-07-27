import { useDispatch, useSelector, Sort  } from "react-redux"
import { useState, useEffect, useContext} from "react"
import {Link } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'
import './feed.css'
import { getAllCommentsThunk } from "../../store/comments"
import { QueryContext } from "../../context/QueryContext"


const SearchResults = () => {
    const dispatch = useDispatch()
    const query = useContext(QueryContext)

    // console.log("query in search results", query)

    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState("created_at")

    const postsObj= useSelector(state => state.posts.allPosts)
    const commentsObj= useSelector(state=>state.comments.allComments)


    //Sorting helper function
    let postsArr = []
    if (postsObj) postsArr = Object.values(postsObj)
    let filteredArr = []
    if (postsArr) {
        // console.log(query)
        filteredArr = postsArr.filter(post => post.title.includes(query.query) || post.body.includes(query.query))
        // console.log("postsArr as well",postsArr)
        // console.log("filtered array",filteredArr)
    }



    useEffect(()=>{
        if (postsArr){
                const sortedPosts = type =>{
                const sorted = filteredArr.sort((a,b)=>{
                    if (type !== "title"){
                        return new Date(b[type]) - new Date(a[type])
                    } else{
                        return a.title.localeCompare(b.title)
                    }
                })
                setPosts(sorted)
            }
            sortedPosts(sortType)
        }
    }, [sortType, postsArr.length])

    useEffect(()=>{
        dispatch(getPostsThunk())
        dispatch(getAllCommentsThunk())
    }, [dispatch ])

    if (!postsArr || !commentsObj) return (<h2>Loading...</h2>)

    return (
        <div id="posts-whole-wrapper">
            <div id="header-sort-wrapper">
                <div id= "header-wrapper">
                    <h1>Search Results</h1>
                    <br></br>
                    <div>
                        <Link exact to ={`/posts/new`} id="new-post">New Post</Link>
                    </div>
                </div>


                {/* CONSIDER YOUR SORTING HERE */}
                <div id="sort-wrapper">
                    <h2>Displaying  {filteredArr.length} results </h2>
                    <h3>Sort by:</h3>
                    <div id="sort-buttons-wrapper">
                        <button onClick={(e)=>setSortType("title")} className={sortType === 'title' ? "sort-button": "not-sorted"}>Title</button>
                        <button onClick={e=>setSortType("created_at")} className={sortType === 'created_at' ? "sort-button": "not-sorted"}>Newest</button>
                    </div>
                </div>
                {/* <button>Trending</button> */}
                {/* <button>Active?</button> */}
                {/* <button>Unanswered</button> */}
            </div>

            <div id="posts-list-wrapper">

                    {filteredArr.length ? (posts.map(post => {
                        return (
                            <div key={post.id} id="single-post-wrapper">
                                <Link exact to ={`/posts/${post.id}`} id="post-title">{post.title}</Link>
                                <p id="body-preview">{`${post.body.slice(0,150)}...`}</p>


                                <div id="date-comments-wrapper">
                                    { post.numComments === undefined && (<h3 id="comment-count">No comments yet</h3>)}
                                    { post.numComments === 1 && (<h3 id="comment-count">{post.numComments} comment</h3>)}
                                    { post.numComments > 1 && (<h3 id="comment-count">{post.numComments} comments</h3>)}
                                    <p id='post-info'>Posted by: {post.user.username} on {post.created_at.slice(0,16)}</p>
                                </div>
                                <p></p>
                                {/* <Link exact to ={`/posts/${post.id}/edit`} id="post.id">{post.title}</Link> */}
                                {/* <br></br> */}
                                <br></br>
                            </div>
                        )
                    }))
                    : (<h2>Unfortunately, no results found... </h2>)

                    }

            </div>
        </div>
    )
}

export default SearchResults
