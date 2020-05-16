import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import allActions from './actions/index'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Footer from './components/Footer/Footer'
import Backdrop from './components/Backdrop/Backdrop'
import SubHome from './components/Home/SubHome'
import SubRegister from './components/Register/SubRegister'
import SubLogin from './components/Login/SubLogin'

const PrimaryLayout = () => {
  //@dev
  /* const currentUser = useSelector(state => state.currentUser)
  console.log(currentUser) */
  /* const currentJwt = useSelector(state => state.jwt)
  console.log(currentJwt)
  const currentCSRF = useSelector(state => state.csrf)
  console.log(currentCSRF) */
  //@dev
  const [sessionProtect, setSessionProtect] = useState(false)
  const [appError, setAppError] = useState('')
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  const dispatch = useDispatch()
  let backdrop;
  const logOut = () => {
    dispatch(allActions.userActions.logOut())
    dispatch(allActions.jwtActions.destroyToken())
  }
  const toggleSideDrawer = () => {
    setSideDrawerOpen(!sideDrawerOpen)
  }
  const toggleBackdrop = () => {
    setSideDrawerOpen(false)
  }
  if (sideDrawerOpen) {
    backdrop = <Backdrop click={toggleBackdrop} />
  }

    axios.get('/api/session/protect')
      .then(response => {      
      if (response.status === 200) {
          setSessionProtect(true)
        const csrfToken = response.data.csrfToken
        console.log(csrfToken);
        
          dispatch(allActions.csrfActions.setCSRFToken(csrfToken))
      }
    })
      .catch(error => {
      if (error.response.status === 500) {
          setAppError('Services are temporarily disabled. Please try again later.')
        } else if (error.response.status) {
          setAppError(error.response.data)
      } else {
        setAppError('Please contact support. Error code: react failure')
      }
    })

  
  
return (
  <div className="primary-layout">
    <Navbar sideDrawerClickHandler={ toggleSideDrawer } logoutClickHandler={logOut} appErr={appError} />
    <SideDrawer show={sideDrawerOpen} sideDrawerClickHandler={toggleSideDrawer} logoutClickHandler={logOut} />
    { backdrop }
    <main className="entry-content">
      <Switch>
        <Route path="/" exact >
          <SubHome  />
        </Route>
        <Route path="/login">
          <SubLogin />
        </Route>
        <Route path="/register">
          <SubRegister />
        </Route>
        <Route path="*">
          <SubHome />
        </Route>
      </Switch>
    </main>
    <Footer />
  </div>
)
}

const App = () => (
  <Router>
    <PrimaryLayout />
  </Router>
)

export default App