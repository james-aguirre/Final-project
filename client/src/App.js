import { useEffect, useState } from 'react';
import NavBar from './Navbar';
import SignInForm from './SignInForm';
import RegistrationForm from './RegisterForm';
import logo from './logo.svg';
import './App.css';

function App() {
  const [serverData, setServerData] = useState('');
  /* The current page being displayed:
   * 'catalog' - A catalog of products
   * 'register' - The registration page
   * 'sign-in' - The sign in page
   * 'cart' - The view cart page
   */
  const [page, setPage] = useState('sign-in');

  useEffect(() => {
    async function readServerData() {
      const resp = await fetch('/api/hello');
      const data = await resp.json();

      console.log('Data from server:', data);

      setServerData(data.message);
    }

    readServerData();
  }, []);

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
      <NavBar onNavigate={handleNavigate} />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{serverData}</h1>
      </header>
      {page === 'register' && <RegistrationForm />}
      {page === 'sign-in' && (
        <SignInForm onSignIn={() => handleNavigate('catalog')} />
      )}
    </>
  );
}

export default App;
