import React from 'react'
import withAuth from './WithAuth'

const IfAuth = (props) => {
  const {user, children, ...rest} = props

  if (user.authState)
    return React.Children.map(children, (child) => {
        return React.cloneElement(child, {...rest})
      }
    )
  else
    return null
}

export default withAuth(IfAuth)
