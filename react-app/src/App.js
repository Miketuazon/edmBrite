import React, { useState, useEffect, } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage/LandingPage";
import EventsPage from "./components/Events/EventsPage";
import CreateEvent from "./components/Events/CreateEvent/CreateEvent";
import OneEvent from "./components/Events/OneEvent/OneEvent";
import OwnedEventsPage from "./components/Events/OwnedEvents/OwnedEvents";
import EditEvent from "./components/Events/EditEvent/EditEvent";
import TicketsModal from "./components/Tickets/GetTickets/GetTickets";
import CreateTicketsForEvent from "./components/Tickets/CreateTickets/CreateTickets";
import UserLikesPage from "./components/Likes/UserLikesPage/UserLikesPage";
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <LandingPage />
          </Route>
          <Route exact path="/events" >
            <EventsPage />
          </Route>
          <Route exact path="/events/new" >
            <CreateEvent />
          </Route>
          <Route exact path="/events/current" >
            <OwnedEventsPage />
          </Route>
          <Route path="/events/:eventId/edit" >
            <EditEvent />
          </Route>
          <Route exact path="/events/:eventId" >
            <OneEvent />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path = "/events/:eventId/tickets">
            {/* <TicketsModal /> */}
            <CreateTicketsForEvent />
          </Route>
          <Route exact path="/current_user/likes">
            <UserLikesPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
