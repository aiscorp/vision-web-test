import React, {useCallback, useEffect, useState} from 'react'

const storageName = 'auth'

const withAuth = ComposedComponent => {
  return ((props) => {
    const [client_id, setClient_id] = useState(null)
    const [token, setToken] = useState(null)
    const [refresh_token, setRefresh_token] = useState(null)
    const [ready, setReady] = useState(false)

    const login = useCallback((client_id, token, refresh_token) => {
      setClient_id(client_id)
      setToken(token)
      setRefresh_token(refresh_token)

      localStorage.setItem(storageName,
        JSON.stringify({
          client_id: client_id,
          token: token,
          refresh_token: refresh_token
        }))
    }, [])

    const logout = useCallback(() => {
      setClient_id(null)
      setToken(null)
      setRefresh_token(null)
      localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName))
      console.log('withAuth useEffect', data)

      if (data && data.token) {
        login(data.client_id, data.token, data.refresh_token)
      }
      setReady(true)
    }, [])

    const user = {
      authState: !!token,
      client_id: client_id,
      token: token,
      refresh_token: refresh_token,
      ready: ready,
      login: login,
      logout: logout
    }

    console.log('withAuth user', user)

    return <ComposedComponent user={user} {...props}/>
  })
}

export default withAuth
