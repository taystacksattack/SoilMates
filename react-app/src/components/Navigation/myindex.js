import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import SideBar from '../SideBar';
import './Navigation.css';
import '../../index.css';
import { useHistory } from 'react-router-dom';
import { QueryContext } from '../../context/QueryContext';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [sideBar, setSideBar] = useState(false);
  const { query, setQuery, submit, setSubmit } = useContext(QueryContext);
  const [search, setSearch] = useState(false);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
  };

  const submitQuery = async (e) => {
    e.preventDefault();
    setSubmit(!submit);
    setQuery(search);
    history.push('/search-results');
  };

  useEffect(() => {
    if (!sideBar) return;

    const closeMenu = (e) => {
      setSideBar(false);
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [sideBar]);

  return (
    <>
      <div id="sticky-wrapper">
        <ul id="navigation-wrapper">
          <div id="left-side-nav">
            <li>
              <i class="fa-solid fa-compass" onClick={e => setSideBar(!sideBar)} id="compass"></i>
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
                    <NavLink exact to="/soils/new">Get Soil Data</NavLink>
                  </li>
                </ul>
              </div>
            )}
            <li id="logo-li">
              <NavLink exact to="/" id="logo">soil<span className="weighty" id="logo">mates</span></NavLink>
            </li>
            <li>
              <NavLink exact to="/about" className="link">About</NavLink>
            </li>
            <div id="form-wrapper">
              {/* Remove the form element */}
              <input
                placeholder="Browse Questions"
                id="search-input"
                type="textarea"
                value={search}
                onChange={handleSearch}
              />
              <div>
                <button id="submit-button" type='button' onClick={submitQuery}>Search</button>
              </div>
            </div>
          </div>

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
