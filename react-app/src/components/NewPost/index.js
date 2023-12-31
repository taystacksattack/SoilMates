import { useDispatch, useSelector } from "react-redux";
import { useState,useEffect } from 'react';
import { createPostThunk } from '../../store/posts'
import { useHistory } from 'react-router-dom';
import './NewPost.css'


const CreatePost = ({soil}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userObj = useSelector(state => state.session.user)
    // console.log("soil in newpost", soil)


    const [title, setTitle] = useState('')
    const [body, setBody] = useState(soil ? `% Sand: ${soil.percent_sand}% \n% Silt: ${soil.percent_silt}% \n% Clay: ${soil.percent_clay}% \nCEC: ${soil.cec}cmol(c)/kg \nBulk Density: ${soil.bdod}kg/dm3 \nNitrogen: ${soil.nitrogen}g/kg \nSoil Organic Content: ${soil.soc}g/kg \npH: ${soil.phh2o}` : "")
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)


// TESTESTESTESING this is just to be able to make the pull request
//tudtdrtdrtudrtud

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

    if (!userObj) return( <h2>Please log in or sign up to view this content</h2>)

    return (
        <div id='new-posts-wrapper'>

            <div id='soil-post-form-wrapper'>
                <h2>New Post</h2>
                <form onSubmit ={(e)=> submitPost(e)} id="soil-post-form-elements">
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
                            id="soil-post-form-body-input"
                            type= "textarea"
                            value={body}
                            onChange={e=> setBody(e.target.value)}
                        >
                        </textarea>
                    </label>

                    <br></br>
                    <div id="submit-button-wrapper">
                        <button disabled={disabled} id="submit-button" type='submit'>Post!</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost
