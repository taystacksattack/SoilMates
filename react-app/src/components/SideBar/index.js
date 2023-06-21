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
					<li className='large-links'>
						<NavLink exact to="/feed" className='large-links'>All Posts</NavLink>
					</li>

					{/* new post button? */}
					{/* new soil request button? */}

                    <br></br>
					<p>PUBLIC</p>
					{/* <li className='highlight'>
						<NavLink exact to="/feed">Feed</NavLink>
					</li> */}
					<div id="smaller-links">
						<li className='highlight'>
							<NavLink exact to="/posts">My Posts</NavLink>
						</li>
						<li className='highlight'>
							<NavLink exact to="/soils">Soil Data</NavLink>
						</li>
					</div>


				</ul>
			</div>

		</>
	);
}

export default Navigation;
