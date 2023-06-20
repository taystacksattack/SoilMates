import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useModal } from '../../context/Modal'
import { editSoilThunk, getSoilsThunk } from "../../store/soils";
import OpenModalButton from "../OpenModalButton";
// import SuccessModal from "../SuccessModal";
import { useHistory } from "react-router-dom";


const EditSoilTitleModal = ({soil}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const [newTitle, setNewTitle] = useState(soil.title)
    const [success, setSuccess]= useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [disabled, setDisabled]= useState(false)


    const saveSoil = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if(Object.values(validationErrors).length) {
            return
        }

        // console.log("soilData in modal", soilData)

        const updatedSoil = {
            title: newTitle,
            latitude: soil.latitude,
            longitude: soil.longitude,
            percent_sand: soil.percent_sand,
            percent_silt: soil.percent_silt,
            percent_clay: soil.percent_clay,
            cec: soil.cec,
            bdod: soil.bdod,
            nitrogen: soil.nitrogen,
            soc: soil.soc,
            phh2o: soil.phh2o,
        }

        console.log("new soil stuff", updatedSoil)
        await dispatch(editSoilThunk(soil.id, updatedSoil))
        setSuccess(true)
        history.push('/soils')
        dispatch(getSoilsThunk())
        setTimeout(closeModal, 3000)
        // closeModal()
    }

    useEffect(()=>{
        const errors = {}
        if(newTitle.length < 5 || newTitle.length >=100) errors['title']="Please provide a title between 5 and 100 characters"
        setValidationErrors(errors)
    }, [newTitle])

    const errorLength = Object.values(validationErrors).length

    useEffect(()=>{
    //     console.log(hasSubmitted)
        errorLength  && hasSubmitted ? setDisabled(true): setDisabled(false)
    },[errorLength, hasSubmitted])

    console.log("soil in general in modal", soil)

    return(
        <div>
            {success && (
                <div>
                    <h1 id="save-success">Title Saved Successfully!</h1>
                </div>
            )}
            {!success && (
                <div>
                <h2>Edit Soil Title</h2>
                {hasSubmitted && validationErrors.title && (
                        <div className="errors-info">
                            <p>{validationErrors.title}</p>
                        </div>
                    )}
                <input
                id="title-input"
                type= "textarea"
                value={newTitle}
                onChange={e=> setNewTitle(e.target.value)}
                >
                </input>
                {/* <h3>Ready to save this Soil?</h3> */}
                <button disabled={disabled} onClick={saveSoil}>Submit new title</button>
                <div onClick={saveSoil}>
                </div>

                <button onClick={closeModal}>Discard changes</button>
                </div>
            )}
        </div>
    )
}

export default EditSoilTitleModal
