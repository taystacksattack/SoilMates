import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import './index.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id="main-body">
        <SideBar />
        {isLoaded && (
          <Switch>
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

            <Route path="/feed">
              <Feed />
            </Route>

            <Route path="/soils">
              <Soils />
            </Route>

          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
