import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../../actions/index'

import './Home.css'
import splashImage from '../../undraw_good_team_m7uu.svg'
import shareImage from '../../undraw_collaborators_prrw.svg'

const Home = (props) => {

    return (
        <div>
            <div className="hero-landing flex-grid">
                <div className="col">
                    <h1>Not just another<br></br> to-do list...</h1>
                    <Link to="/register"><button className="theme-button">Get Started</button></Link>
                </div>
                <div className="col">
                    <img className="splash-image" src={splashImage} alt="splash minions"/>
                </div>
            </div>
            <div className="lead-in flex-grid">
                <div className="col">
                    <img className="splash-image" src={shareImage} alt="splash minions"/>
                </div>
                <div className="col">
                    <h2>Get started by signing up or creating a new task list</h2>
                    <p>Registered users can save their task lists indefinitely and even share them with friends and family! Registration is free and easy!<br></br>You can use our task list app for free but you won't be able to share or save your lists.<br></br>All free lists are deleted after 48 hours</p>
                </div>
            </div>
        </div>
    )
}
export default Home