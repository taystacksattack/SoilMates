import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useState } from 'react-redux';
import ProfileButton from './ProfileButton';
import SideBar from '../SideBar'
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [sideBar, setSideBar] = useSelector(false)

	return (
		<>
			<div >
				<ul id="navigation-wrapper">
					{/* needs to show navbar */}
					<i class="fa-solid fa-compass" onClick={e=> setSideBar(!sideBar)}></i>
					{sideBar && <SideBar/>}
					<li>
						<NavLink exact to="/" id="logo">soil<span id="weighty">mates</span></NavLink>
					</li>
					<li>
						<NavLink exact to="/about">About</NavLink>
					</li>
					<div></div>

					{/* insert search bar feature and some buttons here */}

					{isLoaded && (
						<div>
							<li>
								<ProfileButton user={sessionUser} />
							</li>
						</div>
					)}
				</ul>
			</div>


		</>
	);
}

export default Navigation;
