import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const loginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const signupClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };
  return (
    <>
      <button onClick={loginClick}>Login</button>
      <button onClick={signupClick}>Signup</button>
    </>
  );
}
