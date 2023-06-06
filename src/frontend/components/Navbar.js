import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'
import './Navbar.css';


const Navigation = () => {
    return (
        <Navbar className="navbar" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand>
                <img src="fungible.png" width="40" height="40" className="" alt="" />
                    &nbsp;Fungible
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home &nbsp;&nbsp;&nbsp;</Nav.Link>
                        <Nav.Link as={Link} to="/marketplace" className="navbaritems" >Marketplace &nbsp;&nbsp;&nbsp;</Nav.Link>
                        <Nav.Link as={Link} to="/createnft">Create NFT&nbsp;&nbsp;&nbsp; </Nav.Link>
                        <Nav.Link as={Link} to="/listednft">Listed NFTs&nbsp;&nbsp;&nbsp;</Nav.Link>
                        <Nav.Link as={Link} to="/purchases">Purchases&nbsp;&nbsp;&nbsp;</Nav.Link>
                        <Nav.Link as={Link} to="/collections">Collections&nbsp;&nbsp;&nbsp;</Nav.Link>
                        <Nav.Link as={Link} to="/accounts">Accounts&nbsp;&nbsp;&nbsp;</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link className="authenticators"  as={Link} to="/register">Register&nbsp;&nbsp;&nbsp;</Nav.Link>
                    <Nav.Link className="authenticators"  as={Link} to="/login">Account/Login&nbsp;&nbsp;&nbsp;</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;


