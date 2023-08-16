import React, { useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './Searchbar';
import image from '../../images/logoTitle.png'
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import Footer from './Footer';
function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		const closeMenu = () => {
		  setIsHovered(false);
		};

		document.addEventListener("mouseleave", closeMenu);

		return () => document.removeEventListener("mouseleave", closeMenu);
	  }, []);

	  const closeMenu = () => setIsHovered(false);
	return (
		<ul className='navBar'>
			<ul className='left-side-nav'>
				<li className='homeButton'>
					<NavLink exact to="/events">
						<h2 className='header' style={{color: "#F05537"}}>
							<span className="e">e</span>
							dmBrite
							</h2>
					</NavLink>
				</li>
				<li className='search-bar' id="s">
					< SearchBar />
				</li>
					< Footer/>
			</ul>
			{isLoaded && (
				<ul className='right-side'>
					{
						sessionUser ?
							<>
								<li className="create-an-event-button" id="e">
									<NavLink className="create-an-event-button" exact to="/events/new"><i class="fa fa-plus"></i>
										<div>Create an event</div>
									</NavLink>
								</li>
								<li className="go-to-likes-button" id="l">
									<NavLink className="go-to-likes-button" exact to="/current_user/likes" style={{ "text-decoration": "none" }}><i class="fa-sharp fa-regular fa-heart"></i>
										<div>Likes</div>
									</NavLink>
								</li>
								{/* <NavLink className="createEventButton" to="/events/new">Create an event</NavLink> */}
								<li className='tickets-button' id="t">
									<NavLink className='tickets-button' exact to="/current_user/tickets" style={{ "text-decoration": "none" }}>
										<i class="fa-solid fa-ticket"></i>
										<div style={{fontWeight: "bold"}}>Tickets</div>
									</NavLink>
								</li>
							</>
							: null
					}
					{
				sessionUser ?
					<div className='dropdown-menu-user'>
						<ProfileButton user={sessionUser}></ProfileButton>
					</div>
					: (
						<>
						  <OpenModalButton
							buttonText="Log In"
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						  />

						  <OpenModalButton
							buttonText="Sign Up"
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						  />
						</>
					  )
					}
				</ul>
			)}
		</ul>
	);
}

export default Navigation;
