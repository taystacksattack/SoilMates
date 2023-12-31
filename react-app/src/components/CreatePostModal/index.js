import { useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
import { createPostThunk } from '../../store/posts'
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal'
import './CreatePostModal.css'


const CreatePostModal = ({soil}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {closeModal} = useModal()

    const [title, setTitle] = useState(soil? soil.title : "")
    const [body, setBody] = useState(soil ? `% Sand: ${soil.percent_sand}% \n% Silt: ${soil.percent_silt}% \n% Clay: ${soil.percent_clay}% \nCEC: ${soil.cec}cmol(c)/kg \nBulk Density: ${soil.bdod}kg/dm3 \nNitrogen: ${soil.nitrogen}g/kg \nSoil Organic Content: ${soil.soc}g/kg \npH: ${soil.phh2o}` : "")
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

        const formData= new FormData()
        formData.append("title", title)
        formData.append("body", body)

        const result = await dispatch(createPostThunk(formData))

        setHasSubmitted(false)
        setSuccess(true)
        setTimeout(closeModal, 2000)
        setTitle('')
        setBody('')
        history.push('/posts')
    }

    useEffect(()=>{
        const errors = {}
        if(title.length < 5 || title.length >=100) errors['title']="Please provide a title between 5 and 100 characters"
        if(body.length < 5 || body.length >=2000) errors['body']="Please provide a post between 5 and 2000 characters"
        setValidationErrors(errors)
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
        <div id='soil-post-modal-wrapper'>
            {success && (
                <div>
                    <h1 id="save-success">Posted!</h1>
                </div>
            )}
            {!success && (
                <div id='soil-post-form-wrapper'>
            <h2>New Post</h2>
                <form onSubmit ={(e)=> submitPost(e)}>
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
                        <button disabled={disabled} id="submit-button" type='submit'>Post!</button>
                    </div>
                    <br></br>
                </form>
            </div>
            )}
        </div>
    )
}

export default CreatePostModal
