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
						<NavLink exact to="/feed">Feed</NavLink>
					</li>

					{/* new post button? */}
					{/* new soil request button? */}

                    <br></br>
					<p>PUBLIC</p>
					{/* <li>
						<NavLink exact to="/feed">Feed</NavLink>
					</li> */}
                    <li>
						<NavLink exact to="/posts">My Posts</NavLink>
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
