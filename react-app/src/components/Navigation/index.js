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
				<li className='homebutton'>
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
					<li className="create-an-event-button">
						<NavLink exact to="/events/new"><i class="fa fa-plus">Create an event</i></NavLink>
					</li>
					<li className="go-to-likes-button">
						<NavLink exact to="/">Likes</NavLink>
					</li>
					{/* <NavLink className="createEventButton" to="/events/new">Create an event</NavLink> */}
					<li>
						<NavLink exact to ="/">Tickets</NavLink>
					</li>
					<ProfileButton user={sessionUser}></ProfileButton>
				</ul>
			)}
		</ul>
	);
}

export default Navigation;
