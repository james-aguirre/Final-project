import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './componenets/Navbar';
import AppContext from './components/NavBar';
import RegistrationForm from './RegisterForm';
import SignInForm from './SignInForm';
import './layout.css';
import './App.css';

const tokenKey = 'react-context-jwt';

function App() {
  const [serverData, setServerData] = useState('');
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);
  const [page, setPage] = useState('sign-in');

  useEffect(() => {
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
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

  const contextValue = { user, token, handleSignIn, handleSignOut };
  // onclick function for navigating to different pages on the site
  function handleNavigate(page) {
    setPage(page);
    if (page === 'sign-out') {
      sessionStorage.removeItem('token');
      setPage('sign-in');
    }
  }

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <NavBar onNavigate={handleNavigate} />
        <Routes>
          <Route path="register" element={<RegistrationForm />} />
          <Route
            path="sign-in"
            element={<SignInForm onSignIn={() => handleNavigate('catalog')} />}
          />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
