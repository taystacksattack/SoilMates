import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteSoilThunk } from '../../store/soils'
import { useHistory } from "react-router-dom";


const DeleteSoilModal = ({soil}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const deleteSoil = (e) => {
        e.preventDefault();
        dispatch(deleteSoilThunk(soil.id))

        closeModal()
        history.push('/soils')
    }

    return(
        <div>
            <div>
                <h2>Confirm Delete</h2>
                <h3>Are you sure you want to delete this soil sample?</h3>
                <button onClick={deleteSoil}>Yes, please!</button>
                <button onClick={closeModal}>No, thanks!</button>
            </div>
        </div>
    )
}

export default DeleteSoilModal
