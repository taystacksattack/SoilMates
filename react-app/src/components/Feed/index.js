import { useDispatch, useSelector, Sort  } from "react-redux"
import { useState, useEffect} from "react"
import {Link } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'
import './feed.css'


const Feed = () => {
    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState("created_at")

    const postsObj= useSelector(state => state.posts.allPosts)
    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS/USERNAMES

    //Sorting helper function
    let postsArr = []
    if (postsObj) postsArr = Object.values(postsObj)
    useEffect(()=>{
        if (postsArr){
                const sortedPosts = type =>{
                const sorted = postsArr.sort((a,b)=>{
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
    }, [dispatch ])

    if (!postsArr) return (<h2>Loading...</h2>)

    return (
        <div id="posts-whole-wrapper">
            <div id="header-sort-wrapper">
                <div id= "header-wrapper">
                    <h1>All Posts</h1>
                    <br></br>
                    <div>
                        <Link exact to ={`/posts/new`} id="new-post">New Post</Link>
                    </div>
                </div>


                {/* CONSIDER YOUR SORTING HERE */}
                <div id="sort-wrapper">
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

                    {postsObj && posts.map(post => {
                        return (
                            <div key={post.id} id="single-post-wrapper">
                                <Link exact to ={`/posts/${post.id}`} id="post-title">{post.title}</Link>
                                <p id="body-preview">{`${post.body.slice(0,150)}...`}</p>
                                <p id='post-info'>Posted by: {post.user.username} on {post.created_at.slice(0,16)}</p>
                                {/* <Link exact to ={`/posts/${post.id}/edit`} id="post.id">{post.title}</Link> */}
                                {/* <br></br> */}
                                <br></br>
                            </div>
                        )
                    })}

            </div>
        </div>
    )
}

export default Feed
