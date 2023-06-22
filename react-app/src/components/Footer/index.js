import {Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import './Footer.css'


const Footer = () => {
    const sessionUser = useSelector(state => state.session.user);

    return(
        <div id="footer-wrapper">
            <div id="developer-section-wrapper">
                <h3>Developer Links</h3>
                <div id="links-wrapper">
                    <a href="https://www.linkedin.com/in/taylor-mcclerin-059586177/"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/taystacksattack"><i class="fa-brands fa-github"></i></a>
                </div>
            </div>
            <div id="footer-nav-wrapper">
                <h3>Navigation</h3>
                <div id="nav-links-wrapper">
                    <NavLink exact to="/about">About</NavLink>
                    <NavLink exact to={sessionUser ? "/feed": "/login"}>All Posts</NavLink>
                    <NavLink exact to="/posts/new">Post a Question</NavLink>
                    <NavLink exact to="/soils">Get Soil Data</NavLink>
                </div>
            </div>

        </div>
    )
}

export default Footer
