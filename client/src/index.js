import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import axios from 'axios'
import {Service} from 'axios-middleware'
import {AuthServiceMiddleware} from './middleware/authService'

const service = new Service(axios)

service.register([
  new AuthServiceMiddleware()
])


const app = (
  <Router>
    <App/>
  </Router>
)

ReactDOM.render(app, document.getElementById('root'))

