import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {Navbar, Nav} from 'react-bootstrap'
import IfAuth from '../../hoc/IfAuth'
import IfNotAuth from '../../hoc/IfNotAuth'

const NavBar = props => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Link to="/" className="navbar-brand">
          Vision web test
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <IfNotAuth>
              <NavLink exact to="/signup" activeClassName="active" className="nav-link">Sign Up</NavLink>
              <NavLink exact to="/login" activeClassName="active" className="nav-link">Login</NavLink>
            </IfNotAuth>

            <IfAuth>
              <NavLink exact to="/" activeClassName="active" className="nav-link">Home</NavLink>
              <NavLink exact to="/logout" activeClassName="active" className="nav-link">Logout</NavLink>
            </IfAuth>
          </Nav>

        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
