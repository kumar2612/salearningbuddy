import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="magical-navbar">
      <Navbar.Brand href="/" className="magical-brand">Fun Buddy</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className="magical-link">Home</Nav.Link>
          <NavDropdown title="Categories" id="basic-nav-dropdown" className="magical-dropdown">
            <NavDropdown.Item href="#stories" className="magical-dropdown-item">Stories</NavDropdown.Item>
            <NavDropdown.Item href="#rhymes" className="magical-dropdown-item">Rhymes</NavDropdown.Item>
            <NavDropdown.Item href="#games" className="magical-dropdown-item">Games</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex ml-auto">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2 magical-search"
            aria-label="Search"
          />
          <Button variant="outline-success" className="magical-button">Search</Button>
        </Form>
        <Nav className="ml-auto">
          <NavDropdown title="More" id="more-nav-dropdown" className="magical-dropdown">
            <NavDropdown.Item href="#about-us" className="magical-dropdown-item">About Us</NavDropdown.Item>
            <NavDropdown.Item href="#profile" className="magical-dropdown-item">Profile</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar