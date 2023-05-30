import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UpdateTicketsBought.css'
// import { Link } from "react-router-dom"
// import { editOneEventThunk, getOneEventThunk } from "../../../store/events";
import { updateBoughtTicketsThunk, getBoughtTicketsThunk } from "../../../store/tickets";
import { getEventsThunk } from "../../../store/events";
import { useHistory, useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker"
import { useModal } from "../../../context/Modal";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
const UpdateTicketsBought = ({order, ticket_price}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.session?.user)

    // console.log("order details => ", order)
    const history = useHistory()
    const [first_name, setFirst_name] = useState(order.first_name)
    const [last_name, setLast_name] = useState(order.last_name)
    const [email, setEmail] = useState(order.email)
    const [confirmEmail, setConfirmEmail] = useState(order.confirmEmail)
    const [cardNumber, setCardNumber] = useState(order.cardNumber)
    const [expirationDate, setExpirationDate] = useState(order.expirationDate)
    const [securityCode, setSecurityCode] = useState(order.securityCode)
    const [zipCode, setZipCode] = useState(order.zipCode)
    const [ticket_quantity, setTicket_quantity] = useState(order.ticket_quantity)
    const [ticket_type, setTicket_type] = useState(order.ticket_type)
    const { closeModal } = useModal()
    const eventId= order.event_id

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    const updateFirst_name = (e) => setFirst_name(e.target.value)
    const updateLast_name = (e) => setLast_name(e.target.value)
    const updateEmail = (e) => setEmail(e.target.value)
    const updateConfirmEmail = (e) => setConfirmEmail(e.target.value)
    const updateCardNumber = (e) => setCardNumber(e.target.value)
    const updateExpirationDate = (e) => setExpirationDate(e.target.value)
    const updateSecurityCode = (e) => setSecurityCode(e.target.value)
    const updateZipCode = (e) => setZipCode(e.target.value)
    const updateTicket_quantity = (e) => setTicket_quantity(e.target.value)
    const updateTicket_type = (e) => setTicket_type(e.target.value)

    useEffect(() => {
        let e = {}
        setErrors(e)

        if (!first_name) e.first_name = ('First name is required')
        if (!last_name) e.last_name = ('Last name is required')
        if (!email || !email.includes("@")) e.email = ('Email is required and needs an @ to be accepted')
        if (confirmEmail !== email) e.confirmEmail = ('Emails must match')
        if (!cardNumber) e.cardNumber = ('Card number is required and Card number needs 16 characters')
        if (!expirationDate) e.expirationDate = ('Expiration Date is required')
        if (!securityCode) e.securityCode = ('Security Code is required')
        if (!zipCode) e.zipCode = ('Zip Code is required')
    }, [first_name, last_name, email, confirmEmail, cardNumber, expirationDate, securityCode, zipCode])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (Object.keys(errors).length !== 0) return
        const purchaseData = {ticket_type, ticket_price, ticket_quantity,first_name, last_name, email, confirmEmail, cardNumber, expirationDate, securityCode, zipCode }
        // debugger
        dispatch(updateBoughtTicketsThunk(eventId, order.id, purchaseData,))
        dispatch(getBoughtTicketsThunk)
        closeModal()
        history.push('/current_user/tickets')
    }

    const handleCancel = (e) => {
        e.preventDefault()
        closeModal()
    }
    return (
        // <>Testing</>
        <div className="ticket-checkout-modal">
            <div className="left-side-modal">
                <h2>DISCLAIMER: Please do not put your actual information</h2>
                <form className="purchase-form" onSubmit={handleSubmit}>
                    <ul className="errors">
                        {hasSubmitted &&
                            Object.values(errors).map((error, idx) => (
                                <li key={idx} style={{ color: "red", background: "yellow" }}>
                                    ERROR!: {error}
                                </li>
                            ))}
                    </ul>
                    <div className="billing-info">
                        <h2>Billing information</h2>
                        <h3>Logged in as {currentUser.email}</h3>
                        <div className="first-last-name">
                            <label className="first-name">
                                First name
                                <input
                                    type='text' placeholder='First name' min='1'
                                    required value={first_name} onChange={updateFirst_name}
                                />
                            </label>
                            <label className="last-name">
                                Last name
                                <input
                                    type='text' placeholder='Last name' min='1'
                                    required value={last_name} onChange={updateLast_name}
                                />
                            </label>
                        </div>
                        <div className="email-input"></div>
                        <label className="email-input">
                            Email address
                            <input
                                type='text' placeholder='Email address' min='1'
                                required value={email} onChange={updateEmail}
                            />
                        </label>
                        <label className="email-check">
                            Confirm email
                            <input
                                type='text' placeholder='Confirm email' min='1'
                                required value={confirmEmail} onChange={updateConfirmEmail}
                            />
                        </label>
                    </div>
                    <div className="credit-info">
                        <div className="credit-num">
                            <label className="credit-num">
                                Card number
                                <input
                                    type='text' placeholder='Card number' maxLength="16"
                                    required value={cardNumber} onChange={updateCardNumber}
                                />
                            </label>
                        </div>
                        <div className="exp-sec-zip">
                            <div className="expiration">
                                <label className="exp">
                                    Expiration date
                                    <input
                                        type='string' placeholder='MM/YY' maxLength="4"
                                        required value={expirationDate} onChange={updateExpirationDate}
                                    />
                                </label>
                            </div>
                            <div className="security">
                                <label className="sec">
                                    Security code
                                    <input
                                        type='string' placeholder='123' min='1' maxLength="4"
                                        required value={securityCode} onChange={updateSecurityCode}
                                    />
                                </label>
                            </div>
                            <div className="zip-code">
                                <label className="zip">
                                    Zip code
                                    <input
                                        type='string' placeholder='123456' min='1' maxLength='6'
                                        required value={zipCode} onChange={updateZipCode}
                                    />
                                    <label>
                                    Ticket quantity
                                    <input
                                        type='number' placeholder='123' min='1' max='10'
                                        required value={ticket_quantity} onChange={updateTicket_quantity}
                                    />
                                    </label>
                                    <div className="hidden">
                                    Ticket type
                                    <input
                                        type='text' placeholder='123' min='1'
                                        required value={ticket_type} onChange={updateTicket_type}
                                    />
                                    </div>
                                </label>
                            </div>
                            <div className="place-order">
                                <button className="place-button" type="submit">Place Order</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="right-side-modal">
                    <button onClick={handleCancel} className="purchase-close-button">Close</button>
                <div className="summary-num-tickets">
                    <div className="order-summary"></div>
                    <div className="ticket-price"></div>
                </div>
                <div className="subtotal-fees"></div>
                <div className="total-price">
                    <div className="type-ticket">{ticket_type}</div>
                    <div className="total-tix">Total # of tickets: {ticket_quantity}</div>
                    <div className="price">Total price: ${ticket_price * ticket_quantity}</div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTicketsBought
