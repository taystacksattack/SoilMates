import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect } from "react"
import {Link, NavLink } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'
import CreatePostModal from "../CreatePostModal"
import DeletePostModal from "../DeletePostModal"
import EditPostModal from "../EditPostModal"


const CurrentPosts = () => {
    const dispatch = useDispatch()

    const postsObj= useSelector(state => state.posts.allPosts)
    const user = useSelector(state => state.session.user)
    // console.log(user)

    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS/USERNAMES

    //Sorting helper function will go here
    const postsArr = Object.values(postsObj)

    useEffect(()=>{
        dispatch(getPostsThunk())
    }, [dispatch])

    if (!postsObj) return (<h2>Loading...</h2>)

    return (
        <div id="posts-whole-wrapper">
            <div id="posts-list-wrapper">

                <h2>My Posts</h2>
                <br></br>
                <NavLink exact to={`/posts/new`}>New Post</NavLink>

                {/* <div id="new-post">
                    <OpenModalButton
                        buttonText ="Create post"
                        modalComponent ={<CreatePostModal/>}
                    />
                </div> */}
                <br></br>

                {/* CONSIDER YOUR SORTING HERE */}

                {postsObj && Object.values(postsObj).map(post => {
                    if (post.ownerId === user.id){ //filters out from all posts
                    return (
                        <div key={post.id}>
                            <Link exact to ={`/posts/${post.id}`} id="post-title">{post.title}</Link>
                            <p id="body-preview">{`${post.body.slice(0,150)}...`}</p>
                            <p>Posted by: {post.user.username} on {post.created_at.slice(0,16)}</p>
                            <div id="buttons-wrappers">
                            <OpenModalButton
                                buttonText ="Delete Post"
                                modalComponent ={<DeletePostModal post={post}/>}
                            />
                            {/* <NavLink exact to={`/posts/${postId}/edit`}>Edit Post</NavLink> */}

                            <OpenModalButton
                                buttonText ="Edit post"
                                modalComponent ={<EditPostModal post={post}/>}
                            />

                    {/* buttonText ="Edit Post"
                    // modalComponent ={<EditPostModal post={post}/>}
                    /> */}
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
