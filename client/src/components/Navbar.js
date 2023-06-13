import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppContext from '../components/AppContext';
import { useContext } from 'react';

export default function NavBar({ onNavigate }) {
  const { user, handleSignOut } = useContext(AppContext);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ValTrade</Navbar.Brand>
          <Nav className="me-auto">
            {user && (
              <Nav.Link href="sign-out" onClick={handleSignOut}>
                Sign out
              </Nav.Link>
            )}
            {!user && <Nav.Link href="sign-in">Sign in</Nav.Link>}
            <Nav.Link href="catalog">Catalog</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
