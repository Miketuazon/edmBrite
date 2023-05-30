import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TicketsBought.css'
// import { Link } from "react-router-dom"
import { getEventsThunk } from "../../../store/events";
// import { useHistory } from "react-router-dom";
import { getBoughtTicketsThunk } from "../../../store/tickets";
import OpenModalButton from "../../OpenModalButton";
import UpdateTicketsBought from "../UpdateTicketsBought/UpdateTicketsBought";
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
      <h1>Ticket orders page</h1>
      <div className="bought-list">
        {
          orders.filter(order => order.user_id_ticket_buyer === current_user.id)
            .map(order => (
              <div key={order.id} className="order-bought">
                <h2>Ticket Order #{order.id}</h2>
                <h3>
                  {
                    events.filter(event => event.id === order.event_id).map(e  => (
                      <li style={{listStyle: "none"}}key={e.id}>
                        <img className="preview-image-event" src={`${e.event_preview_image}`}></img>
                        <div>{e.event_name}</div>
                      </li>
                    ))

                  }
                  </h3>
                <h3>Ticket Type: {order.ticket_type}</h3>
                <h4>Ticket Quantity: {order.ticket_quantity}</h4>
                <h5>Ticket Price: ${order.ticket_price}</h5>
                <div>Total Price: ${order.ticket_price * order.ticket_quantity}</div>
                <br></br>
                <OpenModalButton classname="update-tickets-button"
                modalComponent={<UpdateTicketsBought ticket_type={order.ticket_type} ticket_quantity={order.ticket_quantity} ticket_price={order.ticket_price}order={order}/>}
                buttonText={`Update`}
                >
                </OpenModalButton>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default TicketsBoughtPage;
