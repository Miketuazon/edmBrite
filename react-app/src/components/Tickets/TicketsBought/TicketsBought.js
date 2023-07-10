import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TicketsBought.css'
// import { Link } from "react-router-dom"
import { getEventsThunk } from "../../../store/events";
// import { useHistory } from "react-router-dom";
import { getBoughtTicketsThunk } from "../../../store/tickets";
import OpenModalButton from "../../OpenModalButton";
import OpenModalDelete from "../../Events/OwnedEvents/OpenModalDelete";
import UpdateTicketsBought from "../UpdateTicketsBought/UpdateTicketsBought";
import DeleteTicketOrderModal from "../DeleteTicketOrderModal/DeleteTicketOrderModal";
import { Link } from "react-router-dom";
const TicketsBoughtPage = () => {
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.session.user)

  const ticketsObj = useSelector((state) => state.tickets);
  const eventsObj = useSelector(state => state.events)
  const events = Object.values(eventsObj)
  // console.log("ticketsObj => ", ticketsObj);
  // console.log("INSIDE TICKETSBOUGHT +=====>");
  const orders = Object.values(ticketsObj)
  // console.log("orders => ", orders)
  // console.log("events => ", events)
  useEffect(() => {
    dispatch(getEventsThunk())
    dispatch(getBoughtTicketsThunk(orders));
  }, [dispatch]);

  // const eventForTicket = ({order}) => {
  //   return (
  //     <div>
  //     {
  //       events.filter(event => event.id === order.id)?.map(event =>  (
  //         <li key={event.id}>
  //           <img src={event.event_preview_image}></img>
  //         </li>
  //       ))
  //     }
  //     </div>
  //   )
  // }

  if (ticketsObj === null) return <>Loading....</>
  if (!current_user) return <h1>UNAUTHORIZED! YOU ARE NOT LOGGED IN</h1>
  return (
    <div className="tickets-bought-page">
      <h1 style={{"paddingLeft": "10px"}}>Ticket orders page</h1>
      <div className="bought-list" style={{"paddingLeft": "10px", "paddingRight": "10px"}}>
        {
          // needs to be greater than 0 since orders is also bringing in the created event's tickets
          orders.length ?
            orders.filter(order => order.user_id_ticket_buyer === current_user.id)
              .map(order => (
                <div key={order.id} className="order-bought">
                  <div>
                    {
                      events.filter(event => event.id === order.event_id).map(e => (
                        <Link style={{ listStyle: "none" }} key={e.id} to={`/events/${order.event_id}`} target="_blank">
                          <div className="preview-image-container">
                            <img className="preview-image-event" src={`${e.event_preview_image}`}></img>
                          </div>
                          <div className="event-container">
                            <h2 style={{ "fontWeight": "bold" }}>Ticket Order #{order.id}</h2>
                            <br></br>
                            <div>{e.event_name}</div>
                          </div>
                        </Link>
                      ))

                    }
                  </div>
                  <Link to={`/events/${order.event_id}`} target="_blank">
                    <div className="event-container">
                      <h3>Ticket Type: {order.ticket_type}</h3>
                      <h4>Ticket Quantity: {order.ticket_quantity}</h4>
                      <h5>Ticket Price: ${order.ticket_price}</h5>
                      <div>Total Price: ${order.ticket_price * order.ticket_quantity}</div>
                    </div>
                  </Link>
                  <br></br>
                  <div className="update-delete-container">
                    <div className="update">
                      <OpenModalButton classname="update-tickets-button"
                        modalComponent={<UpdateTicketsBought ticket_type={order.ticket_type} ticket_quantity={order.ticket_quantity} ticket_price={order.ticket_price} order={order} />}
                        buttonText={`Update`}
                      >
                      </OpenModalButton>
                    </div>
                    <div className="delete-order">
                      <button className="delete-button-order">
                        <OpenModalDelete className="delete-tickets-button"
                          itemText="Delete"
                          modalComponent={<DeleteTicketOrderModal order={order} orderId={order.id} eventId={order.event_id}
                          />}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            :
            <div className="no-tickets-ordered">
              <h2 className="no-tickets-header">You currently have no orders. </h2>
              <h3>Go to an event and buy some tickets!</h3>
            </div>
        }
      </div>
    </div>
  );
};

export default TicketsBoughtPage;
