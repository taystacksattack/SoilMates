import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Posts from './components/Posts'
import SinglePost from './components/SinglePost'
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreatePost from "./components/NewPost";
import EditPost from './components/EditPost'
import SideBar from './components/SideBar'
import Feed from './components/Feed'
import Soils from "./components/Soils";
import SoilsFetch from "./components/SoilsFetch";
import './index.css'
import SplashPage from "./components/SplashPage";
import Footer from "./components/Footer";
import About from "./components/About";
import SearchResults from './components/SearchResults'
import { QueryContext } from "./context/QueryContext";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // holds the search query input
  const [query, setQuery] = useState('')
  const [submit, setSubmit] = useState(false)

  const userObj = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <QueryContext.Provider value={{query, setQuery, submit, setSubmit}}>
    <div id="whole-wrapper">
      <Navigation isLoaded={isLoaded} />
      <div id="main-body">
        {userObj ? (<SideBar />) : null}

        {isLoaded && (
          <Switch>

            <Route path="/about" >
              <About />
            </Route>

            <Route path="/login" >
              <LoginFormPage />
            </Route>

            <Route path="/signup">
              <SignupFormPage />
            </Route>

            <Route path="/posts/new">
              <CreatePost />
            </Route>

            <Route path="/posts/:postId/edit">
              <EditPost />
            </Route>

            <Route path="/posts/:postId">
              <SinglePost />
            </Route>

            <Route path="/posts">
              <Posts />
            </Route>

            <Route path="/search-results">
              <SearchResults />
            </Route>

            <Route path="/feed">
              <Feed />
            </Route>

            <Route path="/soils/new">
              <SoilsFetch />
            </Route>

            <Route path="/soils">
              <Soils />
            </Route>

            <Route path="/" >
              {!userObj?(<SplashPage />):(<Feed/>)}
            </Route>
          </Switch>
        )}
      </div>
      <Footer/>
    </div>
    </QueryContext.Provider>
    </>
  );
}

export default App;
