import { useState } from 'react';
import './AuthPage.css';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main className="AuthPage">
      <img src="/logo512.png" alt="logo512" style={{width: '40%'}} />
        <div className="auth-container">
          {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
        </div>
      <span className="sign-log" onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</span>
    </main>
  );
}