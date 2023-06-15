import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>

			<div id="left-side-bar">
				<ul>
					<li>
						<NavLink exact to="/feed">Home</NavLink>
					</li>
                    <br></br>
					<p>PUBLIC</p>
					{/* <li>
						<NavLink exact to="/feed">Feed</NavLink>
					</li> */}
                    <li>
						<NavLink exact to="/posts">My Questions</NavLink>
					</li>
					<li>
						<NavLink exact to="/soils">Soil Data</NavLink>
					</li>


				</ul>
			</div>

		</>
	);
}

export default Navigation;
