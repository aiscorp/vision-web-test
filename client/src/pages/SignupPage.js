import React, {useState} from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

const SignupPage = props => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [invited, setInvited] = useState(null)
  const [name, setName] = useState(null)
  const [surname, setSurname] = useState(null)

  const signup = async () => {
    const request = {
      user: {email, password},
      invited_by: invited,
      name,
      surname,
      country_key: 'RU',
      phone: '+78003002010'
    }

    console.log('signup', request)

    const response = await axios.post('http://erp.apptrix.ru/api/clients/create/', request)
  }


  return (
    <Container className="col-md-6 mx-auto my-2">
      <h2>Please sign up:</h2>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="fname" placeholder="Name"
                        onChange={event => setName(event.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Surname</Form.Label>
          <Form.Control type="text" name="lname" placeholder="Surname"
                        onChange={event => setSurname(event.target.value)}/>
        </Form.Group>

        <Form.Group>
          <Form.Label>Invited by </Form.Label>
          <Form.Control type="text" placeholder="Invited by"
                        onChange={event => setInvited(event.target.value)}/>
        </Form.Group>

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
                onClick={signup}>
          Sign Up...
        </Button>

        <Link to="/login" className="btn btn-info px-5 ml-2">Login if registered</Link>
      </Form>
    </Container>
  )
}

export default SignupPage
