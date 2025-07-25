import { useState, useRef } from 'react';
import './Login.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      emailRef.current && emailRef.current.focus();
      return;
    }
    setLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setError('');
      onLogin && onLogin();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg-pastel">
      <svg className="bg-blob upper-right" viewBox="0 0 320 320" fill="none">
        <ellipse cx="220" cy="100" rx="100" ry="100" fill="#a084ee" opacity="0.7" />
        <rect x="120" y="80" width="120" height="40" rx="16" fill="#38bdf8" opacity="0.7" />
        <rect x="100" y="70" width="20" height="60" rx="8" fill="#6ee7b7" opacity="0.8" />
        <rect x="220" y="70" width="20" height="60" rx="8" fill="#6ee7b7" opacity="0.8" />
      </svg>
      <svg className="bg-blob bottom-left" viewBox="0 0 320 320" fill="none">
        <ellipse cx="100" cy="220" rx="110" ry="110" fill="#6ee7b7" opacity="0.7" />
        <ellipse cx="180" cy="250" rx="60" ry="50" fill="#fca5f1" opacity="0.7" />
        <ellipse cx="60" cy="260" rx="50" ry="40" fill="#38bdf8" opacity="0.7" />
        <rect x="160" y="200" width="16" height="36" rx="8" fill="#a084ee" opacity="0.8" transform="rotate(-20 160 200)" />
      </svg>
      <div className="login-card">
        <h2 className="login-title">Welcome Back!</h2>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          {error && <div className="login-error">{error}</div>}
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            ref={emailRef}
            autoFocus
          />
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? <span className="spinner"></span> : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="login-link-row">
          {isSignup ? (
            <>
              Already have an account?{' '}
              <button type="button" className="login-link-btn" onClick={() => { setIsSignup(false); setError(''); }}>Login</button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{' '}
              <button type="button" className="login-link-btn" onClick={() => { setIsSignup(true); setError(''); }}>Sign Up</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 