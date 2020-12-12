import {AuthContext} from "./authContext"
import React, {useCallback, useEffect, useState} from "react"

const storageName = 'auth'

export const AuthProvider = ({children}) => {

    const autoLogin = () => {
        const data = JSON.parse(localStorage.getItem(storageName))
        let newUser
        if (data && data.token) {
            newUser = {
                authState: !!data.token,
                client_id: data.client_id,
                token: data.token,
                refresh_token: data.refresh_token
            }
        } else {
            newUser = {
                authState: false
            }
        }
        return newUser
    }

    const [user, setUser] = useState(() => autoLogin())

    const updateUser = (user) => setUser(user)

    const login = useCallback((client_id, token, refresh_token) => {
        const newUser = {
            authState: !!token,
            client_id: client_id,
            token: token,
            refresh_token: refresh_token
        }

        localStorage.setItem(storageName,
            JSON.stringify({
                client_id: client_id,
                token: token,
                refresh_token: refresh_token
            }))

        setUser(newUser)
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem(storageName)
        setUser({authState: false})
    }, [])

    return (
        <AuthContext.Provider value={{user, updateUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
