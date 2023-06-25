import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from '../../context/Modal'
import { createSoilThunk } from "../../store/soils";
import OpenModalButton from "../OpenModalButton";
import './CreateSoilModal.css'
// import SuccessModal from "../SuccessModal";
// import { useHistory } from "react-router-dom";


const CreateSoilModal = ({soilData}) =>{
    const dispatch = useDispatch()
    // const history = useHistory()
    const { closeModal } = useModal()

    const [title, setTitle] = useState('')
    const [success, setSuccess]= useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)


    const saveSoil = (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if(Object.values(validationErrors).length) {
            return
        }

        // console.log("soilData in modal", soilData)
        const soilFormData= new FormData()
        soilFormData.append("latitude", soilData.latitude)
        soilFormData.append("longitude", soilData.longitude)
        soilFormData.append("percent_sand", soilData.sand)
        soilFormData.append("percent_silt", soilData.silt)
        soilFormData.append("percent_clay", soilData.clay)
        soilFormData.append("cec", soilData.cec)
        soilFormData.append("bdod", soilData.bdod)
        soilFormData.append("nitrogen", soilData.nitrogen)
        soilFormData.append("soc", soilData.soc)
        soilFormData.append("phh2o", soilData.phh2o)
        soilFormData.append("title", title)

        dispatch(createSoilThunk(soilFormData))
        setSuccess(true)
        setTimeout(closeModal, 4000)

        // closeModal()
        // history.push('/')
    }

    useEffect(()=>{
        const errors = {}
        if(title.length < 5 || title.length >=100) errors['title']="Please provide a title between 5 and 100 characters"
        setValidationErrors(errors)
    }, [title])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
    //     console.log(hasSubmitted)
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])

    return(
        <div>
            {success && (
                <div id="success-modal">
                    <h1 id="save-success">Saved Successfully!</h1>
                    <h2>Click the<span id="mauve-button">button</span> below to add it to a post </h2>
                </div>
            )}
            {!success && (
                <div id="save-soil-modal-wrapper">
                    <h2>Save your Soil!</h2>
                    {hasSubmitted && validationErrors.title && (
                            <div className="errors-info">
                                <p>{validationErrors.title}</p>
                            </div>
                        )}
                    <input
                        placeholder = "Give it a title"
                        id="title-input"
                        type= "textarea"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                    >
                    </input>


                    <h3>Ready to save this soil?</h3>
                    <div id="save-title-buttons-wrapper">
                        <button disabled={disabled} onClick={saveSoil} id="save-title-buttons">Yes, please!</button>
                        <div onClick={saveSoil}>
                        </div>
                        <button onClick={closeModal} id="cancel-button">No, thanks!</button>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateSoilModal
