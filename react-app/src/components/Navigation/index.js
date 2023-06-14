import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<>
			<div >
				<ul id="navigation-wrapper">
					<li>
						<NavLink exact to="/">Soil Mates</NavLink>
					</li>

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
