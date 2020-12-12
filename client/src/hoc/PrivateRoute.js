import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import withAuth from './WithAuth'

const PrivateRoute = (props) => {
    const {user, component, ...rest} = props

    if (user.authState)
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
                                    pathname: '/login',
                                    state: {from: location}
                                }}
                        />
                }
            />
        )
}

// export default PrivateRoute
export default withAuth(PrivateRoute)

