import './App.scss'
import React from 'react'
import {Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import PrivateRoute from './hoc/PrivateRoute'

function App() {

  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/signup" component={SignupPage}/>
        <PrivateRoute path="/" component={HomePage}/>
        <PrivateRoute path="/logout" component={LogoutPage}/>
      </Switch>
    </>
  )
}

export default App
