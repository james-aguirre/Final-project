import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Navbar';
import SignInForm from './SignInForm';
import RegistrationForm from './RegisterForm';
import './layout.css';
import './App.css';

function App() {
  const [serverData, setServerData] = useState('');
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
      <p>{serverData}</p>
      {page === 'register' && <RegistrationForm />}
      {page === 'sign-in' && (
        <SignInForm onSignIn={() => handleNavigate('catalog')} />
      )}
    </>
  );
}

export default App;
