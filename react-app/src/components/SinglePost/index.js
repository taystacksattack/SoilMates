import { useDispatch, useSelector} from "react-redux"
import { useEffect, useState} from "react"
import {Link, NavLink, useParams } from "react-router-dom"
import { getPostsThunk } from "../../store/posts"
import OpenModalButton from '../OpenModalButton'
import DeletePostModal from '../DeletePostModal'
import EditPostModal from "../EditPostModal"
import './SinglePost.css'
import { createCommentThunk, getCommentsThunk } from "../../store/comments"


const SinglePost = () => {
    const dispatch = useDispatch()
    const {postId} = useParams()
    const [render, setRender]= useState(true)
    const [comment, setComment] = useState('')
    const [showCommentForm, setShowCommentForm] = useState(true)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled] = useState(false)


    const postsObj = useSelector(state => state.posts.allPosts)
    // need user data to toggle edit/delete buttons if not the post's ownerId
    const userObj = useSelector(state => state.session.user)
    // console.log('userobj', userObj)
    const commentsObj = useSelector(state => state.comments.allComments)
    // console.log("commentObj ",commentsObj)

    useEffect(()=>{
        //this gets the posts if, for some reason, the user resets state, and then goes directly to a single post (eliminates need to go from feed, which gets all posts, and then keys into the particular post)
        dispatch(getPostsThunk())
        //this gets the comments here:
        dispatch(getCommentsThunk(postId))
    }, [dispatch])

    // console.log("postsobj",postsObj[postId])

    const submitComment = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if(Object.values(validationErrors).length) return

        const formData = new FormData()
        formData.append('body', comment)
        const result = await dispatch(createCommentThunk(formData))

        setHasSubmitted(false)
        setComment('')
    }

    useEffect(()=>{

    },[dispatch])


    const post= postsObj[postId]
    if (!postsObj || !post || ! commentsObj) return (<h2>Loading...</h2>)
    if (!userObj) return( <h2>Please log in or sign up to view this content</h2>)
    // console.log("post",post)

    return (
        <div id="posts-whole-wrapper">
            <div id="posts-list-wrapper">
                <div id="upper-section">
                    <h2 id="post-title">{post.title}</h2>
                    {userObj.id === post.ownerId &&(
                    <div id="buttons-wrappers">
                        <div id="green-button-wrapper">
                            <OpenModalButton
                                buttonText ="Edit post"
                                modalComponent ={<EditPostModal post={post} setRender={setRender} render={render}/>}
                            />

                        </div>
                        {/* <NavLink exact to={`/posts/${postId}/edit`}>Edit Post</NavLink> */}
                        <OpenModalButton
                        id="sort-button"
                        buttonText ="Delete Post"
                        modalComponent ={<DeletePostModal post={post}/>}
                        />

                        {/* <OpenModalButton
                            buttonText ="Edit post"
                            modalComponent ={<EditPostModal post={post}/>}
                        /> */}

                        {/* buttonText ="Edit Post"
                        // modalComponent ={<EditPostModal post={post}/>}
                        /> */}
                    </div>
                    )}
                </div>
                <p id="post-body">{post.body}</p>
                <p id="post-info">Posted by: {post.user.username} on {post.created_at.slice(0,16)}</p>
                <br/>
            <div id='soil-post-modal-wrapper'>

            {showCommentForm && (
                <div id='soil-post-form-wrapper'>
                    <h2>New comment</h2>
                    <form onSubmit ={(e)=> submitComment(e)}>
                        {hasSubmitted && validationErrors.title && (
                            <div className="errors-info">
                                <p>{validationErrors.title}</p>
                            </div>
                        )}

                        {hasSubmitted && validationErrors.body && (
                            <div className="errors-info">
                                <p>{validationErrors.body}</p>
                            </div>
                        )}
                        <label>
                            <textarea
                                placeholder = "New comment..."
                                id="edit-post-form-body-input"
                                type= "textarea"
                                value={comment}
                                onChange={e=> setComment(e.target.value)}
                            >
                            </textarea>
                        </label>

                        <br></br>
                        <div id="green-button-wrapper">
                            <button disabled={disabled} id="submit-button" type='submit'>Post Comment!</button>
                        </div>
                        <br></br>
                    </form>
                </div>
            )}
        </div>

            <div id="comments-wrapper">
                <h2 id="post-title">Comments</h2>
                {Object.values(commentsObj).length ? (
                    Object.values(commentsObj).map(comment=>{
                        return (
                            <div id="single-comment-wrapper">
                                <p id="post-body">{comment.body}</p>
                                <p id="post-info">Posted by: {comment.user.username} on {comment.created_at.slice(0,16)}</p>
                            </div>
                            )
                    })
                )
                :(<h3>Be the first to comment!</h3>)}
            </div>
            </div>

        </div>
    )
}

export default SinglePost
