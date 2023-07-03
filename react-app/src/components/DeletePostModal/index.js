import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal'
import { deletePostThunk } from '../../store/posts'
import { useHistory } from "react-router-dom";
import './DeletePostModal.css'


const DeletePostModal = ({post}) =>{
    const dispatch = useDispatch()
    const history = useHistory()
    const { closeModal } = useModal()

    const deletePost = (e) => {
        e.preventDefault();
        dispatch(deletePostThunk(post.id))

        closeModal()
        history.push('/posts')
    }

    return(
        <div>
            <div id="delete-post-modal-wrapper">
                <h2>Confirm Delete</h2>
                    <h3>Are you sure you want to delete this post?</h3>
                <div>
                    <div id="buttons-wrappers">
                        <button onClick={deletePost}>Yes, please!</button>
                        <div id="green-button-wrapper">
                            <button onClick={closeModal}>No, thanks!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal
