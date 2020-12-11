import React, {useState} from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import  {Link} from 'react-router-dom'
import axios from 'axios'
import WithAuth from '../hoc/WithAuth'

const LoginPage = props => {
  const {user} = props
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const login = async () => {
    const request = {
      username: email,
      password
    }

    console.log('login request', request)
    const response = await axios.post('http://erp.apptrix.ru/api/clients/token/', request)

    if(response.status === 200){
      const data = response.data
      user.login(data.client_id, data.access, data.refresh)
    }
    console.log('login response', response)
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

export default WithAuth(LoginPage)

