import axios from "axios";

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
    return axios.get(`http://erp.apptrix.ru/api/clients/token/refresh/`)
        .then(res => {
            if (res.status === 200) {
                const data = res.data
                console.log('refreshAccessToken data', data)
                return data
            }
            console.log('refreshAccessToken res', res)
        })
        .catch(e => {
            console.log('error', e)
            return e
        })
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








