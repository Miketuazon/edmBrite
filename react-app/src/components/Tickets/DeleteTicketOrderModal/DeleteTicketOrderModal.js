import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import './DeleteTicketOrderModal.css'
import { deleteTicketOrderThunk } from "../../../store/tickets";

function DeleteTicketOrderModal({orderId, eventId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal();
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(deleteTicketOrderThunk(orderId, eventId))
        history.push(`/current_user/tickets`)
        closeModal()
    };

    return (
        <div className="delete-ticket-modal">
            <form onSubmit={handleSubmit}>
                <h1 className="confirm-delete">Confirm Delete</h1>
                <h2 className="warning">Are you sure you want to remove this order?</h2>
                <button type="submit" className="submit">Yes (Delete Order) </button>
                <button onClick={closeModal} className="no">No (Keep Order)</button>
            </form>
        </div>
    );
}


export default DeleteTicketOrderModal
