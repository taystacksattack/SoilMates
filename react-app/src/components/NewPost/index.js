import { useDispatch } from "react-redux";
import { useState,useEffect } from 'react';
import { createPostThunk } from '../../store/posts'
import { useHistory } from 'react-router-dom';


const CreatePost = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const submitPost = async (e) => {
        e.preventDefault()

        setHasSubmitted(true)

        if(validationErrors.length) {
            console.log(validationErrors)
            return
        }

        const formData= new FormData()
        formData.append("title", title)
        formData.append("body", body)

        const result = await dispatch(createPostThunk(formData))
        console.log("errors in front end", result)
        if(result.errors){
            return
        }
        // if (validationErrors.length) return

        setHasSubmitted(false)
        setTitle('')
        setBody('')
        history.push('/posts')
    }

    useEffect(()=>{
        const errors = {}
        if(title.length < 5 || title.length >30) errors['title']="Please provide a title between 5 and 50 characters"
        if(body.length < 5 || body.length >2000) errors['body']="Please provide a post between 5 and 2000 characters"
        setValidationErrors(errors)
    }, [title, body])

    return (
        <div id='whole-new-post-wrapper'>
            <div id='form-wrapper'>
                <form onSubmit ={(e)=> submitPost(e)}>
                    {hasSubmitted && validationErrors.title && (
                        <div className="errors-info">
                            <p>{validationErrors.title}</p>
                        </div>
                    )}
                    <label>
                        <input
                            placeholder = "Title"
                            id="title-input"
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
                            id="body-input"
                            type= "textarea"
                            value={body}
                            onChange={e=> setBody(e.target.value)}
                        >
                        </textarea>
                    </label>

                    <br></br>
                    <div>
                        <button id="submit-button" type='submit'>Post!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
