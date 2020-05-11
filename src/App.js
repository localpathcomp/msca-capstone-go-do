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
    backdrop = <Backdrop click={ toggleBackdrop } />
  }

  

return (
  <div className="primary-layout">
    <Navbar sideDrawerClickHandler={ toggleSideDrawer } />
    <SideDrawer show={ sideDrawerOpen }/>
    { backdrop }
    <main className="entry-content">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </main>
  </div>
)
}

const HomePage = () => <div>Home Page</div>
const LoginPage = () => <div>Login Page</div>
const RegisterPage = () => <div>Register Page</div>

const App = () => (
  <Router>
    <PrimaryLayout />
  </Router>
)

export default App