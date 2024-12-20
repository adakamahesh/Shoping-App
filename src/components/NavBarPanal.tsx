import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './Store/Store';

const NavBar = () => {
    const cartProducts = useSelector((state: RootState) => state.cart);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const navigate = useNavigate(); // Hook for programmatic navigation

    const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim() !== "") {
        // Navigate to the search results page with the query as a parameter
        navigate(`/search?q=${searchQuery}`);
      }
    };
    
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
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              <NavDropdown.Item to="/categories" as={Link}>Product Categories</NavDropdown.Item>
              <NavDropdown.Item href="#action3">
              Filters
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item to="/AddProduct" as={Link}>
                Add New Product
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" type='submit'>Search</Button>
          </Form>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end' >
            <Navbar.Text>
                <Nav.Link to='/cart' as={Link}>My Bag: {cartProducts.length}</Nav.Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default NavBar;