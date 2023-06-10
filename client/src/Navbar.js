import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar({ onNavigate }) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ValTrade</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="catalog">Catalog</Nav.Link>
            <Nav.Link href="sign-in">Sign in</Nav.Link>
            <Nav.Link href="register">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
