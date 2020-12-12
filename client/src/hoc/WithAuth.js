import React from 'react'

import {useAuth} from '../context/authContext'

const storageName = 'auth'


const withAuth = ComposedComponent => {
    return ((props) => {
        const {user, updateUser, login, logout} = useAuth()

        // console.log(user)
        //
        // const data = JSON.parse(localStorage.getItem(storageName))
        //
        // let newUser
        // if (data && data.token) {
        //     newUser = {
        //         authState: !!data.token,
        //         client_id: data.client_id,
        //         token: data.token,
        //         refresh_token: data.refresh_token,
        //         login: login,
        //         logout: logout
        //     }
        // } else {
        //     newUser = {
        //         authState: false,
        //         login: login,
        //         logout: logout
        //     }
        // }
          const newUser = {
                ...user,
                login: login,
                logout: logout
            }

        return <ComposedComponent user={newUser} {...props}/>
    })
}

export default withAuth

// const withAuth = ComposedComponent => {
//     return ((props) => {
//         const {auth, updateAuth} = useAuth()
//
//         const login = useCallback((client_id, token, refresh_token) => {
//             const newUser = {
//                 authState: !!token,
//                 client_id: client_id,
//                 token: token,
//                 refresh_token: refresh_token
//             }
//
//             localStorage.setItem(storageName,
//                 JSON.stringify({
//                     client_id: client_id,
//                     token: token,
//                     refresh_token: refresh_token
//                 }))
//
//             updateAuth(newUser)
//         }, [])
//
//         const logout = useCallback(() => {
//             localStorage.removeItem(storageName)
//             updateAuth(newUser)
//         }, [])
//
//         const data = JSON.parse(localStorage.getItem(storageName))
//
//         let newUser
//         if (data && data.token) {
//             newUser = {
//                 authState: !!data.token,
//                 client_id: data.client_id,
//                 token: data.token,
//                 refresh_token: data.refresh_token,
//                 login: login,
//                 logout: logout
//             }
//         } else {
//             newUser = {
//                 authState: false,
//                 login: login,
//                 logout: logout
//             }
//         }
//
//         return <ComposedComponent user={newUser} {...props}/>
//     })
// }

