import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import AppContext from './components/AppContext';
import Auth from './pages/AuthPage';
import NotFound from './pages/NotFoundPage';
import CatalogPage from './pages/CatalogPage';
import ProductDetails from './pages/ProductDetailsPage';
import SplashPage from './pages/SplashPage';
import CartPage from './pages/CartPage';
import { fetchUser, fetchCartItems } from './lib/api';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [cart, setCart] = useState();

  //authorize if previously logged in.
  useEffect(() => {
    async function setCustomer() {
      const auth = localStorage.getItem(tokenKey);
      if (auth) {
        const a = JSON.parse(auth);
        const customer = await fetchUser(a.user.username);
        setUser(customer);
        setToken(a.token);
        const cart = await fetchCartItems(customer.customerId);
        setCart(cart);
      }
      setIsAuthorizing(false);
    }
    setCustomer();
  }, []);
  if (isAuthorizing) return null;
  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }
  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  const contextValue = {
    user,
    token,
    handleSignIn,
    handleSignOut,
    cart,
    setCart,
  };

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <NavBar />
        <Routes>
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/" element={<SplashPage />} />
          <Route path="/:productId" element={<ProductDetails />} />
          <Route path="/sign-in" element={<Auth action="sign-in" />} />
          <Route path="sign-up" element={<Auth action="sign-up" />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
