import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from 'react';
import { editPostThunk, getPostsThunk } from '../../store/posts'
import { useHistory, useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import './EditPostModal.css'


const EditPostModal = ({post, setRender, render}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const postId = post.id
    const {closeModal} = useModal()

    // useEffect(()=>{
    //     dispatch(getPostsThunk())
    // }, [dispatch])

    const [title, setTitle] = useState(post?.title)
    const [body, setBody] = useState(post?.body)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)
    const [success, setSuccess]= useState(false)

    const submitPost = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if(Object.values(validationErrors).length) {
            return
        }

        const updatedPost ={
            title,
            body
        }

        const result = await dispatch(editPostThunk(postId, updatedPost))

        setHasSubmitted(false)
        setSuccess(true)
        setTimeout(closeModal, 2000)
        setTitle('')
        setBody('')
        setRender(!render)
        // history.push(`/posts`)
    }

    useEffect(()=>{
        const errors = {}
        if(title.length < 5 || title.length >=100) errors['title']="Please provide a title between 5 and 100 characters"
        if(body.length < 5 || body.length >=2000) errors['body']="Please provide a post between 5 and 2000 characters"
        setValidationErrors(errors)
        console.log(title)
        // Object.values(validationErrors).length ? setDisabled(true) : setDisabled(false)
        // console.log(disabled)
        // console.log(validationErrors)
    }, [title, body])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
    //     console.log(hasSubmitted)
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])

    // useEffect(()=>{
    // //     console.log(hasSubmitted)
    //     Object.values(validationErrors).length ? setDisabled(true): setDisabled(false)
    // },[Object.values(validationErrors).length])

    return (
        <div id='edit-post-modal-wrapper'>
            {success && (
                <div>
                    <h1 id="save-success">Posted!</h1>
                </div>
            )}
            {!success && (
                <div id="edit-post-modal-wrapper">
                    <h2>Edit Post</h2>
                    <div id='edit-form-wrapper'>
                        <form onSubmit ={(e)=> submitPost(e)} id='edit-form-wrapper'>
                            {hasSubmitted && validationErrors.title && (
                                <div className="errors-info">
                                    <p>{validationErrors.title}</p>
                                </div>
                            )}
                            <label>
                                <input
                                    placeholder = "Title"
                                    id="soil-title-input"
                                    type= "textarea"
                                    value={title}
                                    onChange={e=> setTitle(e.target.value)}
                                >
                                </input>
                            </label>

                            {hasSubmitted && validationErrors.body && (
                                <div className="errors-info">
                                    <p>{validationErrors.body}</p>
                                </div>
                            )}
                            <label>
                                <textarea
                                    placeholder = "Body"
                                    id="edit-post-form-body-input"
                                    type= "textarea"
                                    value={body}
                                    onChange={e=> setBody(e.target.value)}
                                >
                                </textarea>
                            </label>

                            <br></br>
                            <div id="green-button-wrapper">
                                <button disabled={disabled} id="green-button" type='submit'>Post!</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditPostModal
