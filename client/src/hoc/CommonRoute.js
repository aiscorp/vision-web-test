import React from 'react'
import {Route} from 'react-router-dom'

const CommonRoute = (props) => {
    const {component, ...rest} = props

    return <Route {...rest} component={component}/>
}

export default CommonRoute
