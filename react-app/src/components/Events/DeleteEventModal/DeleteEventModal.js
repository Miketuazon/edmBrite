import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import './DeleteEventModal.css'
import { deleteEventThunk } from "../../../store/events";

function DeleteEventModal({ eventId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteEventThunk(eventId))
        history.push(`/events/current`)
        closeModal()
    };

    return (
        <div className="delete-event-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this event from the listings?</h2>
                <button type="submit" className="submit">Yes (Delete Event) </button>
                <button onClick={closeModal} className="no">No (Keep Event)</button>
            </form>
        </div>
    );
}


export default DeleteEventModal
