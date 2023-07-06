import { useDispatch, useSelector, Sort  } from "react-redux"
import { useState, useEffect} from "react"
import {Link } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'
import './feed.css'
import { getAllCommentsThunk } from "../../store/comments"

const commentCounter = (commentsObj) => {
    const result = {}
    for (let comment of Object.values(commentsObj)){
        result[comment.postId] = 0
    }
    // console.log("result",result)
    Object.values(commentsObj).forEach(comment => {
        result[comment.postId] = (result[comment.postId]) + 1
    })
    return result
}

const Feed = () => {
    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState("created_at")

    const postsObj= useSelector(state => state.posts.allPosts)
    const commentsObj= useSelector(state=>state.comments.allComments)

    console.log(commentsObj)
    // console.log(Object.values(commentsObj))

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
        dispatch(getAllCommentsThunk())
    }, [dispatch ])

    if (!postsArr || !commentsObj) return (<h2>Loading...</h2>)

    const commentCount = commentCounter(commentsObj)
    console.log("commentCount",commentCount)

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
                                

                                <div id="date-comments-wrapper">
                                    { commentCount[post.id] === undefined && (<h3 id="comment-count">No comments yet</h3>)}
                                    { commentCount[post.id] === 1 && (<h3 id="comment-count">{commentCount[post.id]} comment</h3>)}
                                    { commentCount[post.id] > 1 && (<h3 id="comment-count">{commentCount[post.id]} comment</h3>)}
                                    <p id='post-info'>Posted by: {post.user.username} on {post.created_at.slice(0,16)}</p>
                                </div>
                                <p></p>
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
