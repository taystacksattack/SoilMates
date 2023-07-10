import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from 'react';
import { editCommentThunk} from '../../store/comments'
import { useParams } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import './EditPostModal.css'


const EditCommentModal = ({comment, setRender, render}) => {
    const dispatch = useDispatch()
    const commentId = comment.id
    const {closeModal} = useModal()

    const [body, setBody] = useState(comment?.body)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)
    const [success, setSuccess]= useState(false)

    const submitComment = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if(Object.values(validationErrors).length) {
            return
        }

        const updatedComment ={
            body
        }

        const result = await dispatch(editCommentThunk(commentId, updatedComment))

        setHasSubmitted(false)
        setSuccess(true)
        setTimeout(closeModal, 2000)
        setBody('')
        setRender(!render)
        // history.push(`/posts`)
    }

    useEffect(()=>{
        const errors = {}
        if(body.length < 5 || body.length >=1500) errors['body']="Please provide a comment between 5 and 1500 characters"
        setValidationErrors(errors)
        // Object.values(validationErrors).length ? setDisabled(true) : setDisabled(false)
        // console.log(disabled)
        // console.log(validationErrors)
    }, [body])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
    //     console.log(hasSubmitted)
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])


    return (
        <div id='whole-post-modal-wrapper'>
            {success && (
                <div>
                    <h1 id="save-success">Posted!</h1>
                </div>
            )}
            {!success && (
                <div id="edit-post-modal-wrapper">
                    <h2>Edit Comment</h2>
                    <div id='edit-form-wrapper'>
                        <form onSubmit ={(e)=> submitComment(e)} id='edit-form-wrapper'>

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

export default EditCommentModal
