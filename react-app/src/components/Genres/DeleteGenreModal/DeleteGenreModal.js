import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import './DeleteGenreModal.css'
import { deleteGenreThunk } from "../../../store/genres";

function DeleteGenreModal({ genre }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const history = useHistory();
    // console.log("genre => ", genre)
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteGenreThunk(genre.id))
        history.push(`/genres/create`)
        closeModal()
    };

    return (
        <div className="delete-genre-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this genre from the rest?</h2>
                <button type="submit" className="submit">Yes (Delete Genre) </button>
                <button onClick={closeModal} className="no">No (Keep Genre)</button>
            </form>
        </div>
    );
}


export default DeleteGenreModal
