import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState } from "react"
import {Link, NavLink } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'
import CreatePostModal from "../CreatePostModal"
import DeletePostModal from "../DeletePostModal"
import EditPostModal from "../EditPostModal"
import './Posts.css'
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

const CurrentPosts = () => {
    const dispatch = useDispatch()

    const [posts, setPosts] = useState([])
    const [sortType, setSortType] = useState("created_at")
    const [render, setRender]= useState(true)
    // const [userPosts, setUserPosts] = useState(true)

    const user = useSelector(state => state.session.user)
    const postsObj= useSelector(state => state.posts.allPosts)
    const commentsObj= useSelector(state=>state.comments.allComments)
    // console.log(user)

    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS/USERNAMES
    useEffect(()=>{
        dispatch(getPostsThunk())
        dispatch(getAllCommentsThunk())
    }, [dispatch, ])

    const postsArr = Object.values(postsObj)
    useEffect(()=>{
        const sortedPosts = type =>{
            const sorted = [...postsArr].sort((a,b)=>{
                if (type !== "title"){
                    return new Date(b[type]) - new Date(a[type])
                } else{
                    return a.title.localeCompare(b.title)
                }
            })
            setPosts(sorted)
        }
        sortedPosts(sortType)
    }, [sortType, postsArr.length, render])



    if (!postsObj || !commentsObj) return (<h2>Loading...</h2>)
    const commentCount = commentCounter(commentsObj)

    return (
        <div id="posts-whole-wrapper">

                <div id="header-sort-wrapper">
                    <div id="header-wrapper">
                        <h1>My Posts</h1>
                        <NavLink exact to={`/posts/new`} id='new-post'>New Post</NavLink>
                    </div>

                    <div >
                        {/* <div id="new-post">
                            <OpenModalButton
                            buttonText ="Create post"
                            modalComponent ={<CreatePostModal/>}
                            />
                        </div> */}
                        <div id="sort-wrapper">
                            <h3>Sort by:</h3>
                            <div id='sort-buttons-wrapper'>
                                <button onClick={(e)=>setSortType("title")} className={sortType === 'title' ? "sort-button": "not-sorted"}>Title</button>
                                <button onClick={e=>setSortType("created_at")} className={sortType === 'created_at' ? "sort-button": "not-sorted"}>Newest</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONSIDER YOUR SORTING HERE */}
                <div id="posts-wrapper">

                    {postsObj && posts.map(post => {
                        if (post.ownerId === user.id){ //filters out from all posts

                        return (
                            <div key={post.id} id="single-post-wrapper">
                                <div id="upper-section">
                                    <Link exact to ={`/posts/${post.id}`} id="post-title">{post.title}</Link>
                                    <div id="buttons-wrappers">
                                            <OpenModalButton
                                                buttonText ="Delete Post"
                                                modalComponent ={<DeletePostModal post={post}/>}
                                            />
                                            {/* <NavLink exact to={`/posts/${post.id}/edit`}>Edit Post</NavLink> */}
                                            <div id="green-button-wrapper">
                                                <OpenModalButton
                                                    buttonText ="Edit post"
                                                    modalComponent ={<EditPostModal post={post} setRender={setRender} render={render}/>}
                                                />

                                            </div>

                                            {/* buttonText ="Edit Post"
                                            // modalComponent ={<EditPostModal post={post}/>}
                                            /> */}

                                    </div>
                                </div>
                                <p id="body-preview">{`${post.body.slice(0,150)}...`}</p>
                                <div id="date-comments-wrapper">
                                    { commentCount[post.id] === undefined && (<h3 id="comment-count">No comments yet</h3>)}
                                    { commentCount[post.id] === 1 && (<h3 id="comment-count">{commentCount[post.id]} comment</h3>)}
                                    { commentCount[post.id] > 1 && (<h3 id="comment-count">{commentCount[post.id]} comments</h3>)}
                                    <p id="post-date">Posted on {post.created_at.slice(0,16)}</p>

                                </div>

                                {/* <Link exact to ={`/posts/${post.id}/edit`} id="post.id">{post.title}</Link> */}
                                {/* <br></br> */}

                                <br></br>
                            </div>
                        )}

                    })}

            </div>
        </div>
    )
}

export default CurrentPosts
