import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tree from './static/doubletree.png'
import OrangeSpeech from './static/orangespeech.png'
import BrownSpeech from './static/brownspeech.png'
import "./SplashPage.css"


const SplashPage = () =>{
    return (
    <div id="whole-splash-wrapper">

        <div id="splash-wrapper">
        {/* <h2>Hello this is a placeholder for a splashpage</h2> */}
            {/* <img alt="tree" src={Tree} className="tree-stamp1"/> */}
            {/* <img alt="tree" src={Tree} className="tree-stamp2"/> */}
            {/* <img alt="tree" src={Tree} className="tree-stamp3"/> */}
            {/* <img alt="tree" src={Tree} className="tree-stamp4"/> */}
            {/* <img alt="tree" src={Tree} className="tree-stamp5"/> */}
            <div id="background-green">
                <div id="speech-wrapper">
                    <img alt="browse questions" src={BrownSpeech} className="brown-speech"/>
                    <div className="speech-text-wrapper">
                        <h2 className="brown-speech-text">Find the best answers to your soil and farming questions, and help others to find theirs.</h2>
                        <NavLink exact to="/signup" className="brown-button">Sign Up</NavLink>
                    </div>
                </div>
                <div id="speech-wrapper">
                    <img alt="collect data" src={OrangeSpeech} className="orange-speech"/>
                    <h2 className="orange-speech-text">Collect soil data remotely to inform planning and prepare for planting.</h2>
                    <NavLink exact to="/feed" className="orange-button">Browse</NavLink>
                </div>
            </div>
        </div>
        <div id="gray-box-wrapper">
            <div id="gray-box"></div>
            <h2 className="gray-box-text">Share your knowledge with others to help support production and food security.</h2>
        </div>
        <div id="third-green-section">
            {/* <div id="gray-box"></div> */}
            {/* <h2 className="gray-box-text">Share your knowledge with others to help support production and food security.</h2> */}
        </div>
    </div>
    )
}

export default SplashPage
