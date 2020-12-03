import React, {useState} from 'react'
import {Button, Container, Form, Navbar} from 'react-bootstrap'
import IfAuth from '../hoc/IfAuth'
import Redirect, {Link, NavLink} from 'react-router-dom'
import axios from 'axios'

const LoginPage = props => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const login = () => {
    const request = {
      email,
      password
    }

    console.log('login', request)
  }

  return (
    <Container className="col-md-6 mx-auto my-2">
      <h2>Please login:</h2>
      <Form>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
                        onChange={event => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"
                        onChange={event => setPassword(event.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="button" className="px-5"
                onClick={login}>
          Login...
        </Button>

        <Link to="/signup" className="btn btn-info px-5 ml-2">Sign Up if unregistered</Link>
      </Form>
    </Container>
  )
}

export default LoginPage

