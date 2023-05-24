import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createTicketsThunk } from "../../../store/tickets"
import "./CreateTickets.css"

const CreateTicketsForEvent = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    // const currentUser = useSelector(state => state?.session?.user)
    const { eventId } = useParams()
    console.log(eventId)
    const [ticket_type, setTicket_type] = useState("")
    const [ticket_price, setTicket_price] = useState(0)
    const [ticket_quantity, setTicket_quantity] = useState(1)

    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)

    useEffect(() => {
        let e = {}
        setErrors(e)

        if (!ticket_type) e.ticket_type = ('Ticket type is required')
        if (!ticket_price) e.ticket_price = ('Ticket price is required')
        if (!ticket_quantity) e.ticket_quantity = ('Ticket quantity is required')
        if (ticket_price < 0) e.ticket_price = ('Ticket price cannot be less than 0')
        if (ticket_type.length > 25) e.ticket_type = ('Ticket name cannot be more than 25 characters')


    }, [ticket_type, ticket_price, ticket_quantity])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        if (Object.keys(errors).length !== 0) return
        // debugger
        const createdTicketDetails = { ticket_type, ticket_price, ticket_quantity }
        dispatch(createTicketsThunk(createdTicketDetails, eventId))
        history.push(`/events`)
    }

    const updateTicket_type = (e) => setTicket_type(e.target.value)
    const updateTicket_price = (e) => setTicket_price(e.target.value)
    const updateTicket_quantity = (e) => setTicket_quantity(e.target.value)

    console.log("errors => ", errors)
    return (
        <div className="create-tickets">
            <h1>Create tickets!</h1>
            <div className="create-form-div">
                <form className="create-tickets-form" onSubmit={handleSubmit}>
                    <ul className="errors">{hasSubmitted &&
                        Object.values(errors).map((error, idx) => (
                            <li key={idx} style={{ color: "red", background: "yellow" }}>
                                ERROR!: {error}
                            </li>
                        ))}</ul>
                    <h3>What's the name of the ticket?</h3>
                    <div className="ticket-type-create">
                        <label>
                            Name
                            <input
                                type='text' placeholder='Be clear and descriptive' min='1'
                                required value={ticket_type} onChange={updateTicket_type}
                            />
                        </label>
                    </div>
                    <h3>What's the quantity of tickets?</h3>
                    <div className="ticket-type-create">
                        <label>
                            Quantity
                            <input
                                type='number' placeholder='As many as you can hold!' min='1'
                                required value={ticket_quantity} onChange={updateTicket_quantity}
                            />
                        </label>
                    </div>
                    <h3>What's the price of tickets?</h3>
                    <div className="ticket-type-create">
                        <label>
                            Price
                            <input
                                type='number' placeholder='What will be the price?' min='1'
                                required value={ticket_price} onChange={updateTicket_price}
                            ></input>
                        </label>
                        <div>
                            <button className='btn' type="submit">Create tickets!</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTicketsForEvent
