import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  useLocation,
  Route,
  Switch,
  Redirect
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
import SubForgotPassword from './components/ForgotPassword/SubForgotPassword'
import SubResetPassword from './components/ForgotPassword/SubResetPassword'
import List from './components/Lists/List/List'

import PassTest from './components/PassTest'

const PrimaryLayout = () => {
  
  const [sessionProtect, setSessionProtect] = useState(false)
  const [errorProtect, setErrorProtect] = useState(false)
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
  const { loggedIn } = useSelector(state => state.currentUser)
  const appError = useSelector(state => state.appError)
  
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
  if (appError.errorStatus) {
    setTimeout(() => {
      dispatch(allActions.appErrorActions.clearAppError())
      setErrorProtect(!errorProtect)
    }, 10000)
  }
  useEffect(() => {
    axios.get('/api/session/protect')
      .then(response => {
        if (response.status === 200) {
          setSessionProtect(true)
          const csrfToken = response.data.csrfToken
          dispatch(allActions.csrfActions.setCSRFToken(csrfToken))
        }
      })
      .catch(error => {
        if (error.response.status === 500 || error.response.status === 503) {
          dispatch(allActions.appErrorActions.setAppError('Services are temporarily disabled. Please try again later.'))
        } else {
          dispatch(allActions.appErrorActions.setAppError('Please contact support. Error code: react failure'))
        }
      })
  }, [dispatch, errorProtect])

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  let location = useLocation()
  if (location.search) {
    return (
      <Redirect to={`/reset-password/${query.get("reset-password")}`} />
    )
  }
  
return (
  <div className="primary-layout">
    <Navbar sideDrawerClickHandler={toggleSideDrawer} logoutClickHandler={logOut} loggedIn={loggedIn} />
    <SideDrawer show={sideDrawerOpen} sideDrawerClickHandler={toggleSideDrawer} logoutClickHandler={logOut} loggedIn={loggedIn} />
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
        <Route path="/forgot-password">
          <SubForgotPassword />
        </Route>
        <Route path="/reset-password">
          <SubResetPassword />
        </Route>
        <Route path="/pass-test">
          <PassTest />
        </Route>
        <Route path="/list/:guid/:id">
          <List />
        </Route>
        <Route path="*">
          <SubHome />
        </Route>
      </Switch>
    </main>
    <Footer />
    {(appError.errorStatus) ? <div className="app-error"><p>{appError.errorMessage}</p></div> : null}
  </div>
)
}

const App = () => (
  <Router>
    <PrimaryLayout />
  </Router>
)

export default App