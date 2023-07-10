import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deleteCommentThunk } from '../../store/comments'
// import { useHistory } from "react-router-dom";
import './DeleteCommentModal.css'


const DeleteCommentModal = ({comment}) =>{
    const dispatch = useDispatch()
    // const history = useHistory()
    const { closeModal } = useModal()

    const deleteComment = (e) => {
        e.preventDefault();
        dispatch(deleteCommentThunk(comment.id))

        closeModal()
        // history.push('/posts')
    }

    return(
        <div>
            <div id="delete-post-modal-wrapper">
                <h2>Confirm Delete</h2>
                    <h3>Are you sure you want to delete this comment?</h3>
                <div>
                    <div id="buttons-wrappers">
                        <button onClick={deleteComment}>Yes, please!</button>
                        <div id="green-button-wrapper">
                            <button onClick={closeModal}>No, thanks!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCommentModal
