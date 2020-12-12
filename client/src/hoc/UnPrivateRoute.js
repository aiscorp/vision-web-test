import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import withAuth from './WithAuth'

const UnPrivateRoute = (props) => {
    const {user, component, ...rest} = props

    if (!user.authState)
        return (
            <Route {...rest} component={component}/>
        )
    else
        return (
            <Route
                {...rest}
                render={
                    ({location}) =>
                        <Redirect
                            to={
                                {
                                    pathname: '/',
                                    state: {from: location}
                                }}
                        />
                }
            />
        )
}

// export default UnPrivateRoute
export default withAuth(UnPrivateRoute)

