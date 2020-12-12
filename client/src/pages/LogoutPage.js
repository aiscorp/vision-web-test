import React, {useEffect} from 'react'
import WithAuth from "../hoc/WithAuth";
import {Redirect} from "react-router-dom";

const LogoutPage = props => {
    const {user} = props

    useEffect(() => {
        user.logout()
        // do logout
    }, [])

    if (user.authState) {
        return null
    } else {
        return <Redirect push to={{pathname: '/login'}}/>
    }
}

export default WithAuth(LogoutPage)
