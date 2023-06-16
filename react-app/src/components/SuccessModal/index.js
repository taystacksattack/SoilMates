import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteSoilThunk } from '../../store/soils'
import { useHistory } from "react-router-dom";


const SuccessModal = () =>{

    return(
        <div>
            <div>
                <h1>Success!</h1>
            </div>
        </div>
    )
}

export default SuccessModal
