import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <Navbar className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand to='/' as={Link}>MY SHOPE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Catgories" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action2">Product Catgories</NavDropdown.Item>
              <NavDropdown.Item href="#action3">
              Filters
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Add New Product
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end' >
            <Navbar.Text>
                <Nav.Link to='/cart' as={Link}>My Bag 0</Nav.Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default NavBar;