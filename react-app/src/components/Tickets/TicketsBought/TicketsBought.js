import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TicketsBought.css'
// import { Link } from "react-router-dom"
// import { getEventsThunk } from "../../../store/events";
// import { useHistory } from "react-router-dom";
import { getBoughtTicketsThunk } from "../../../store/tickets";
const TicketsBoughtPage = () => {
    const dispatch = useDispatch();


    const ticketsObj = useSelector((state) => state.orders);
    console.log("ticketsObj => ", ticketsObj);
    console.log("INSIDE TICKETSBOUGHT +=====>");
    // const tickets = Object.values(ticketsObj)
    // console.log("tickets => ", tickets)
    useEffect(() => {
      dispatch(getBoughtTicketsThunk());
    }, [dispatch]);

    if (ticketsObj === null) return <>Loading....</>
    return (
      <div className="tickets-bought-page">
        We are in Tickets Bought Page
        <div className="bought-list">


        </div>
      </div>
    );
  };

  export default TicketsBoughtPage;
