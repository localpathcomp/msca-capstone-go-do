import React, { useState, useEffect } from 'react';
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
import Register from './components/Register/Register'

const PrimaryLayout = () => {

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
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
  useEffect(() => {
    fetch('/api/session/retrieve')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])
  
  
return (
  <div className="primary-layout">
    <Navbar sideDrawerClickHandler={ toggleSideDrawer } />
    <SideDrawer show={sideDrawerOpen} click={toggleSideDrawer}/>
    { backdrop }
    <main className="entry-content">
      <Switch>
        <Route path="/" exact >
          <Home />
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route path="/register">
          <Register loggedIn={ false } />
        </Route>/>
      </Switch>
    </main>
  </div>
)
}

const LoginPage = () => <div>Login Page</div>

const App = () => (
  <Router>
    <PrimaryLayout />
  </Router>
)

export default App