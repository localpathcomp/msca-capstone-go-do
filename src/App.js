import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Backdrop from './components/Backdrop/Backdrop'
import Home from './components/Home/Home'

const PrimaryLayout = () => {

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  //const [sessionCookie, seSessionCookie] = useState('')
  let backdrop;
  const toggleSideDrawer = () => {
    setSideDrawerOpen(!sideDrawerOpen)
  }
  const toggleBackdrop = () => {
    setSideDrawerOpen(false)
  }
  if (sideDrawerOpen) {
    backdrop = <Backdrop click={toggleBackdrop} />
  }
  const getDevCookie = () => {
    fetch('/api/session/retrieve')
      .then(response => response.json())
      .then(data => console.log(data))
  }
  
  const getLoginStatus = () => {
    fetch('/api/session/check')
      .then(response => response.json())
      .then(data => console.log(data))
  }
  const getLogout = () => {
    fetch('/api/session/logout')
      .then(response => response.json())
      .then(data => console.log(data))
  }  

return (
  <div className="primary-layout">
    <Navbar sideDrawerClickHandler={ toggleSideDrawer } />
    <SideDrawer show={ sideDrawerOpen }/>
    { backdrop }
    <main className="entry-content">
      <Switch>
        <Route path="/" exact >
          <Home />
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </main>
  </div>
)
}

const LoginPage = () => <div>Login Page</div>
const RegisterPage = () => <div>Register Page</div>

const App = () => (
  <Router>
    <PrimaryLayout />
  </Router>
)

export default App