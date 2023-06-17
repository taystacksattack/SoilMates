import { useDispatch, useSelector} from "react-redux"
import { useEffect, useState} from "react"
import {Link, NavLink, useParams } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'
import DeletePostModal from '../DeletePostModal'
import EditPostModal from "../EditPostModal"



const SinglePost = () => {
    const dispatch = useDispatch()
    const {postId} = useParams()

    const postsObj = useSelector(state => state.posts.allPosts)
    // const userObj = useSe
    // WILL NEED TO GRAB RECOMMENDATIONS/COMMENTS
    // disable edit/delete if not

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
            </div>
        </div>
    )
}

export default SinglePost
