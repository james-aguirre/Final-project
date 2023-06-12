import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Navbar';
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
      <Routes>
        <Route path="/" element={<NavBar onNavigate={handleNavigate} />}>
          <Route path="register" element={<RegistrationForm />} />
        </Route>
      </Routes>
      <p>{serverData}</p>
    </>
  );
}

export default App;
