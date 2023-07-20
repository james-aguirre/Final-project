import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib/api';
import Button from 'react-bootstrap/Button';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [inputValue, setInputValue] = useState({
    username: '',
    password: '',
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await signUpOrIn(action, username, password);
      if (action === 'sign-up') {
        navigate('/sign-in');
      } else if (result.user && result.token) {
        onSignIn(result);
        navigate('/');
        formData.reset();
      }
    } catch (e) {
      setError(e);
    }
  }
  const demoAccount = ['demo'];
  function handleSetDemo() {
    setInputValue({
      user: demoAccount[0],
      pass: demoAccount[0],
    });
  }
  const alternateActionTo = action === 'sign-up' ? '/sign-in' : '/sign-up';
  const alternateActionText =
    action === 'sign-up' ? 'Sign in instead' : 'Register now';
  const submitButtonText = action === 'sign-up' ? 'Register' : 'Log In';
  return (
    <form className="w-100" onSubmit={handleSubmit}>
      <div>
        <label className="form-label">
          Username:
          <input
            required
            autoFocus
            type="text"
            name="username"
            className="form-control bg-light"
            value={inputValue.user}></input>
        </label>
      </div>
      <div>
        <label className="form-label">
          Password:
          <input
            required
            type="password"
            name="password"
            className="form-control bg-light"
            value={inputValue.pass}></input>
        </label>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <small>
          <Link className="text-muted" to={alternateActionTo}>
            {alternateActionText}
          </Link>
        </small>
        <Button onClick={handleSetDemo} className="demo-btn btn-success">
          Demo Account
        </Button>
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
      </div>
      {error && <div style={{ color: 'red' }}>Error: {error.message}</div>}
    </form>
  );
}
