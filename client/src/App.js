import './App.scss'
import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import LogoutPage from './pages/LogoutPage'
import PrivateRoute from "./hoc/PrivateRoute"
import UnPrivateRoute from "./hoc/UnPrivateRoute"
import {AuthProvider} from "./context/authProvider"


function App() {

    return (
        <AuthProvider>
            <NavBar/>
            <Switch>
                <UnPrivateRoute path="/login" component={LoginPage}/>
                <UnPrivateRoute path="/signup" component={SignupPage}/>

                <PrivateRoute path="/logout" component={LogoutPage}/>
                <PrivateRoute path="/" component={HomePage}/>
            </Switch>
        </AuthProvider>
    )
}

export default App
