import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import SearchBar from './Searchbar';
import image from '../../images/logoTitle.png'
function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

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
									<NavLink className='tickets-button' exact to="/" style={{ "text-decoration": "none" }}>
										<i class="fa-solid fa-ticket"></i>
										<div>Tickets</div>
									</NavLink>
								</li>
							</>
							: null
					}
					<ProfileButton user={sessionUser}></ProfileButton>
				</ul>
			)}
		</ul>
	);
}

export default Navigation;
