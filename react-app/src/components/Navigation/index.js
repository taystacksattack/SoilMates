import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SideBar from '../SideBar'
import './Navigation.css';
import '../../index.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const [sideBar, setSideBar] = useState(false)
	const [query, setQuery] = useState('')
	const [showMenu, setShowMenu] = useState(false);

	const submitQuery = async (e) => {
		e.preventDefault()
	}

	useEffect(() => {
		if (!sideBar) return;

		const closeMenu = (e) => {
			setSideBar(false);
		}
    	document.addEventListener("click", closeMenu);
    	return () => document.removeEventListener("click", closeMenu);
	}, [sideBar]);


	return (
		<>
			<div >
				<ul id="navigation-wrapper">

					<div id="left-side-nav">
						<li>
							<i class="fa-solid fa-compass" onClick={e=> setSideBar(!sideBar)} id="compass"></i>
						</li>
							{sideBar && (
								<div id="sidebar">
										<ul>
											<li className='highlight'>
												<NavLink exact to="/feed" className="large-links">All Posts</NavLink>
											</li>

											{/* new post button? */}
											{/* new soil request button? */}

											<br></br>
											<p>PUBLIC</p>
											<li className='highlight'>
												<NavLink exact to="/posts/new">Post a Question</NavLink>
											</li>
											<li className='highlight'>
												<NavLink exact to="/soils">Get Soil Data</NavLink>
											</li>

										</ul>
								</div>
							)}
						<li id="logo-li">
							<NavLink exact to="/" id="logo">soil<span id="weighty">mates</span></NavLink>
						</li>
						<li>
							<NavLink exact to="/about" className="link">About</NavLink>
						</li>
						<div id="form-wrapper">
							<form
							onSubmit ={(e)=> submitQuery(e)}
							id="form-wrapper"
							>
								<input
									placeholder = "Browse Questions"
									id="search-input"
									type= "textarea"
									value= {query}
									onChange={e=> setQuery(e.target.value)}
									>
								</input>
								<div>
									<button id="submit-button" type='submit'>Search</button>
								</div>
							</form>
						</div>
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
