import { useDispatch } from "react-redux";
import { useState } from "react";
import { useModal } from '../../context/Modal'
import { createSoilThunk } from "../../store/soils";
// import OpenModalButton from "../OpenModalButton";
// import SuccessModal from "../SuccessModal";
// import { useHistory } from "react-router-dom";


const CreateSoilModal = ({soilData}) =>{
    const dispatch = useDispatch()
    // const history = useHistory()
    const { closeModal } = useModal()

    const [title, setTitle] = useState('')

    const saveSoil = (e) => {
        e.preventDefault();
        console.log("soilData in modal", soilData)
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

        closeModal()
        // history.push('/')
    }

    return(
        <div>
            <div>
                <h2>Save your Soil!</h2>
                <input
                    placeholder = "Give it a title"
                    id="title-input"
                    type= "textarea"
                    value={title}
                    onChange={e=> setTitle(e.target.value)}
                >
                </input>
                <h3>Ready to save this Soil?</h3>
                <button onClick={saveSoil}>Yes, please!</button>
                {/* <OpenModalButton
                onClick={saveSoil}
                buttonText ="Yes Please!"
                modalComponent ={<SuccessModal />}
                /> */}
                <button onClick={closeModal}>No, thanks!</button>
            </div>
        </div>
    )
}

export default CreateSoilModal
