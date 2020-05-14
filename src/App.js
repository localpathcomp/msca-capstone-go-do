import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import SideDrawer from './components/SideDrawer/SideDrawer'
import Footer from './components/Footer/Footer'
import Backdrop from './components/Backdrop/Backdrop'
import SubHome from './components/Home/SubHome'
import SubRegister from './components/Register/SubRegister'
import SubLogin from './components/Login/SubLogin'

const PrimaryLayout = () => {

  const dispatch = useDispatch()
  const counter = useSelector( (state) => state.counter )

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false)
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