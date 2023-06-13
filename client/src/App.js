import { useEffect, useState, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import AppContext from './components/AppContext';
import Auth from './pages/AuthPage';
import './layout.css';
import './App.css';

const tokenKey = 'react-context-jwt';

function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  //authorize if previusly logged in / page refreshed
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

  return (
    <>
      <AppContext.Provider value={contextValue}>
        <NavBar />
        <Routes>
          <Route path="sign-in" element={<Auth action="sign-in" />} />
          <Route path="sign-up" element={<Auth action="sign-up" />} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
