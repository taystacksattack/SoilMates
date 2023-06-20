import React, { useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, } from 'react-redux';
import ProfileButton from './ProfileButton';
import SideBar from '../SideBar'
import './Navigation.css';
import '../../index.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [sideBar, setSideBar] = useState(false)

	return (
		<>
			<div >
				<ul id="navigation-wrapper">

					<div id="left-side-nav">
						<li>
							<i class="fa-solid fa-compass" onClick={e=> setSideBar(!sideBar)}></i>
						</li>
							{sideBar && (
								<div id="sidebar">
										<ul>
											<li>
												<NavLink exact to="/feed" class="large-links">All Posts</NavLink>
											</li>

											{/* new post button? */}
											{/* new soil request button? */}

											<br></br>
											<p>PUBLIC</p>
											<li>
												<NavLink exact to="/posts/new">Post a Question</NavLink>
											</li>
											<li>
												<NavLink exact to="/soils">Get Soil Data</NavLink>
											</li>

										</ul>
								</div>
							)}
						<li id="logo-li">
							<NavLink exact to="/" id="logo">soil<span id="weighty">mates</span></NavLink>
						</li>
						<li>
							<NavLink exact to="/about">About</NavLink>
						</li>
					</div>


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
