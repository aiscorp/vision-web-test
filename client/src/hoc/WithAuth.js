import React from 'react'

import {useAuth} from '../context/authContext'

const withAuth = ComposedComponent => {
    return ((props) => {
        const {user, updateUser, login, logout} = useAuth()

          const newUser = {
                ...user,
                login: login,
                logout: logout
            }

        return <ComposedComponent user={newUser} {...props}/>
    })
}

export default withAuth
