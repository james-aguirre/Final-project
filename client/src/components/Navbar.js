import Container from '../components/ui/Container';
import AppContext from '../components/AppContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function NavBar({ onNavigate }) {
  const { user, handleSignOut } = useContext(AppContext);
  return (
    <div className="border-b bg-[#1B1F20] text-white">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center text-sm">
          <Link to="/" className="text-bold font-xl">
            <h1 className="font-bold text-xl">ValTrade</h1>
          </Link>
          <div className="mx-6 flex items-center space-x-4 lg:space-x-6">
            <Link to="/catalog" className="text-bold font-xl ">
              <h1 className="font-semibold text-large">Catalog</h1>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-x-4">
            {user ? (
              <Link
                to="/sign-in"
                onClick={handleSignOut}
                className="text-bold font-xl ">
                <h1 className="font-semibold text-large mr-2">Sign out</h1>
              </Link>
            ) : (
              <Link to="/sign-in" className="text-bold font-xl ">
                <h1 className="font-semibold text-large">Sign in</h1>
              </Link>
            )}
            <Link to="/cart" className="text-bold font-xl ">
              <ShoppingCart
                color="white"
                size={32}
                className="w-6 h-6 font-lg"
              />
              <span className="text-sm text-white absolute right-5 top-0 h-6 w-6 justify-center rounded-full p-2.5">
                0
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

// <Nav.Link href="catalog">CAtalog</Nav.Link>
//             {user && (
//               <Nav.Link href="/sign-in" onClick={handleSignOut}>
//                 Sign out
//               </Nav.Link>
//             )}
//             {!user && <Nav.Link href="sign-in">Sign in</Nav.Link>}
//             <Nav.Link className='ml-10' href="cart">CArt</Nav.Link>
// export default function NavBar({ onNavigate }) {
//   const { user, handleSignOut } = useContext(AppContext);
//   return (
//     <>
//       <Navbar bg="dark" variant="dark" className="val-font navbar">
//         <Container>
//           <Navbar.Brand href="/">VAlTrade</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="catalog">CAtalog</Nav.Link>
//             {user && (
//               <Nav.Link href="/sign-in" onClick={handleSignOut}>
//                 Sign out
//               </Nav.Link>
//             )}
//             {!user && <Nav.Link href="sign-in">Sign in</Nav.Link>}
//             <Nav.Link className='ml-10' href="cart">CArt</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// }
