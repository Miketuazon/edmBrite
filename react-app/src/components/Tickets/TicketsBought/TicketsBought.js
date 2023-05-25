import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TicketsBought.css'
// import { Link } from "react-router-dom"
// import { getEventsThunk } from "../../../store/events";
// import { useHistory } from "react-router-dom";
import { getBoughtTicketsThunk } from "../../../store/tickets";
const TicketsBoughtPage = () => {
  const dispatch = useDispatch();
  const current_user = useSelector(state => state.session.user)

  const ticketsObj = useSelector((state) => state.tickets);
  const eventsObj = useSelector(state => state.events)
  const events = Object.values(eventsObj)
  console.log("ticketsObj => ", ticketsObj);
  console.log("INSIDE TICKETSBOUGHT +=====>");
  const orders = Object.values(ticketsObj)
  console.log("orders => ", orders)
  useEffect(() => {
    dispatch(getBoughtTicketsThunk());
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
              <div key={order.id}>
                <h2>Ticket Order#{order.id}</h2>
                {/* <eventForTicket order={order}/> */}
                <h3>Ticket Type: {order.ticket_type}</h3>
                <h4>Ticket Quantity: {order.ticket_quantity}</h4>
                <h5>Ticket Price: ${order.ticket_price}</h5>
                <div>Total Price: ${order.ticket_price * order.ticket_quantity}</div>
                <br></br>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default TicketsBoughtPage;
