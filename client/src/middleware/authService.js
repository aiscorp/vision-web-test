const storageName = 'auth'

class AuthServiceMiddleware {
  constructor() {
    this.storageName = storageName
  }

  onRequest(config) {
    const data = getAuthFromStorage()
    if (data && data.token) {
      console.log('Axios_onRequest middleware with Bearer Token')

      return {
        ...config,
        headers: {
          ...config.headers,
          'Authorization': `Bearer ${data.token}`
        }
      }

    } else {
      console.log('Axios_onRequest middleware NO Bearer Token')
      return config
    }
  }

  onResponseError(err) {
    if (err.response.status === 401) {
      return refreshAccessToken()
        .then((data) => {
          setAuthInStorage(data)
          console.log('Refresh token success')
        })
        .catch((error) => {
          clearAuthInStorage()
          console.log('Refresh login error: ', error)
          throw error
        })
    }
    throw err
  }

}

const refreshAccessToken = async () => {

  // const data = {
  //   client_id: client_id,
  //   token: token,
  //   refresh_token: refresh_token
  // }

}

const getAuthFromStorage = () => {
  return JSON.parse(localStorage.getItem(storageName))
}

const setAuthInStorage = (data) => {
  localStorage.setItem(storageName,
    JSON.stringify(data))
}

const clearAuthInStorage = () => {
  localStorage.removeItem(storageName)
}


export {AuthServiceMiddleware, refreshAccessToken}








