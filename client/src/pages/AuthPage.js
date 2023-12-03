/* eslint-disable no-unused-vars -- Remove me */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import AppContext from '../components/AppContext';
import './AuthPage.css';

export default function AuthPage({ action }) {
  const navigate = useNavigate();
  const { user, handleSignIn } = useContext(AppContext);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const welcomeMessage =
    action === 'sign-in'
      ? 'Please sign in to continue'
      : 'Create an account to get started!';
  return (
    <div className="auth-container">
      <div className="row pt-20 align-items-center">
        <div className="col-xl-4">
          <header className="text-center">
            <p className="text-muted mb-4 welcome-msg">{welcomeMessage}</p>
          </header>
          <div className="card p-3">
            <AuthForm key={action} action={action} onSignIn={handleSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
}
