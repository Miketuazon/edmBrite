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
						<img alt="icon" src={image} style={{ width: '50px', height: '50px' }}></img>
					</NavLink>
				</li>
				<li className='search-bar'>
					< SearchBar />
				</li>
				<div className='footer'>
					<ul className='git-linked-link'>
						<li className='name'>
							Created by: Michael Tuazon
						</li>
						<li className='link'>
							<a href='https://www.linkedin.com/in/miketuazon/'><i class="fa-brands fa-linkedin"></i></a>
							&nbsp;&nbsp; |
							<a href='https://github.com/Miketuazon' className='end'><i class="fa-brands fa-github" style={{"color": "gray"}}></i></a>
							&nbsp;&nbsp; |
							<a href='https://wellfound.com/u/michael-tuazon' className='end'><i class="fa-brands fa-angellist" style={{"color": "gray", "listStyle": "none"}}></i></a>

						</li>
					</ul>
				</div>
			</ul>
			{isLoaded && (
				<ul className='right-side'>
					{
						sessionUser ?
							<>
								<li className="create-an-event-button">
									<NavLink className="create-an-event-button" exact to="/events/new"><i class="fa fa-plus"></i>
										<div>Create an event</div>
									</NavLink>
								</li>
								<li className="go-to-likes-button">
									<NavLink className="go-to-likes-button" exact to="/current_user/likes" style={{ "text-decoration": "none" }}><i class="fa-sharp fa-regular fa-heart"></i>
										<div>Likes</div>
									</NavLink>
								</li>
								{/* <NavLink className="createEventButton" to="/events/new">Create an event</NavLink> */}
								<li className='tickets-button'>
									<NavLink className='tickets-button' exact to="/current_user/tickets" style={{ "text-decoration": "none" }}>
										<i class="fa-solid fa-ticket"></i>
										<div>Tickets</div>
									</NavLink>
								</li>
							</>
							: null
					}
					{
				sessionUser ?
					<div className='dropdown-menu-user'>
						<ProfileButton user={sessionUser}></ProfileButton>
						&nbsp;
						{sessionUser.email}
						&nbsp;
						<i classname="arrow-down" class="fa-solid fa-chevron-down"></i>
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
