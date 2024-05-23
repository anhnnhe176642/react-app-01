import { Button, Form, FormControl, Nav, NavLink, Navbar, NavbarBrand } from "react-bootstrap";

import logo from '../images/logo192.png'

const Header = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <NavbarBrand href="#home">
                <img src={logo} width={50} height={50}/>
            </NavbarBrand>
            <Nav className="mr-auto">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#features">Features</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
            </Nav>
            <Form className="d-flex">
                <FormControl type="text" placeholder="Search"

                    className="mr-sm-2" />

                <Button variant="outline-light">Search</Button>
            </Form>
        </Navbar>
    );
}

export default Header;