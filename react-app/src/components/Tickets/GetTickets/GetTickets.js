import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './GetTickets.css'
import { Link, useParams } from "react-router-dom"
import { getTicketsThunk } from "../../../store/tickets";
import { getOneEventThunk } from "../../../store/events";
import OpenModalButton from "../../OpenModalButton";
import TicketCheckout from "../Checkout-Modal/TicketCheckout";
const TicketsDisplay = () => {
    const dispatch = useDispatch()
    // const event = useSelector(())
    const { eventId } = useParams()
    console.log(eventId)
    const [ticketCount, setTicketCount] = useState(1)
    const event = useSelector(state => state.events.singleEvent?.event)
    console.log("event => ", event)
    const ticketsObj = useSelector(state => state?.tickets?.ticketsOfEvent)
    console.log("ticketsObj => ", ticketsObj)
    // console.log("Object.values(ticketsObj) => ", Object.values(ticketsObj))
    // Object.values(ticketsObj).filter()
    // console.log("tickets => ", tickets)
    useEffect(() => {
        dispatch(getOneEventThunk(eventId))
        dispatch(getTicketsThunk(eventId))
    }, [dispatch, eventId])

    let total;

    if (!ticketsObj || ticketsObj === undefined || ticketsObj === null) return <h1>Tickets coming soon!</h1>
    // if (ticketsObj === undefined)
    // if (!eventId) return <>Loading....</>
    return (
        <div className="tickets-modal">
            <ul className="ticket-type-price">
                {
                    Object.values(ticketsObj.type).map((t, index) => (
                        <div className="ticket-container">
                            <div className="container">
                                <div className="type-button">
                                    <div className="type-ticket">{Object.keys(ticketsObj.type)}</div>
                                    <div className="button-plus-minus">
                                        <button className="btn-minus" disabled={ticketCount === 1} onClick={() => setTicketCount(ticketCount - 1)}>-</button>
                                        <div>{ticketCount}</div>
                                        <button className="btn-plus" disabled={ticketCount === 10} onClick={() => setTicketCount(ticketCount + 1)}>+</button>
                                        <div>Price: ${t?.ticket_price}</div>
                                    </div>
                                </div>
                            </div>
                            <OpenModalButton className="check-out-button"
                                modalComponent={<TicketCheckout eventId={eventId} event={event} ticketsObj={ticketsObj} ticket_price={t.ticket_price} ticketCount={ticketCount} />}
                                buttonText={`Check out for $${t?.ticket_price * ticketCount}`}
                            ></OpenModalButton>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}
export default TicketsDisplay
