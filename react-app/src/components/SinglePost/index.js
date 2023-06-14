import { useDispatch, useSelector} from "react-redux"
import { useEffect, useState} from "react"
import {Link, useParams } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'


const SinglePost = () => {
    const dispatch = useDispatch()
    const {postId} = useParams()

    const postsObj = useSelector(state => state.posts.allPosts)
    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS

    useEffect(()=>{
        dispatch(getPostsThunk())
    }, [dispatch])

    // console.log("postsobj",postsObj[postId])


    const post= postsObj[postId]
    if (!postsObj || !post) return (<h2>Loading...</h2>)
    console.log("post",post)

    return (
        <div id="posts-whole-wrapper">
            <div id="posts-list-wrapper">

                <h2>{post.title}</h2>
                <p id="post-body">{post.body}</p>

            </div>
        </div>
    )
}

export default SinglePost
