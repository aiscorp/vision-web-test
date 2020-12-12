import React from 'react'
import withAuth from './WithAuth'

const IfNotAuth = (props) => {
  const {user, children, ...rest} = props

  if (!user.authState)
    return React.Children.map(children, (child) => {
        return React.cloneElement(child, {...rest})
      }
    )
  else
    return null
}

export default withAuth(IfNotAuth)
