import { useDispatch, useSelector, Sort  } from "react-redux"
import { useEffect, useState} from "react"
import {Link } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'


const CurrentPosts = () => {
    const dispatch = useDispatch()

    const postsObj= useSelector(state => state.posts.allPosts)
    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS/USERNAMES

    //Sorting helper function

    useEffect(()=>{
        dispatch(getPostsThunk())
    }, [dispatch ])

    if (!postsObj) return (<h2>Loading...</h2>)

    return (
        <div id="posts-whole-wrapper">
            <div id="posts-list-wrapper">

                <h2>My Posts</h2>
                <div id="new-post">
                    <Link exact to ={`/posts/new`}>New Post</Link>
                </div>
                <br></br>

                {/* CONSIDER YOUR SORTING HERE */}

                {postsObj && Object.values(postsObj).map(post => {
                    return (
                        <div id={post.id}>
                            <Link exact to ={`/posts/${post.id}`} id="post.id">{post.title}</Link>
                            <p id="body-preview">{`${post.body.slice(0,150)}...`}</p>
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

export default CurrentPosts
