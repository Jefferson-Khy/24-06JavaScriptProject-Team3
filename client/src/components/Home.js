import React from 'react';
import { useNavigate } from 'react-router-dom';
import './global.css';
import { Text, Button } from '@radix-ui/themes';

export default function Home() {
  const navigate = useNavigate();

  const subscriptionClick = (e) => {
    e.preventDefault();
    navigate('/subscription');
  };

  return (
    <>
      <div className='header-container'>
        <div className='header-content'>
          <img className='cube-icon' src='cube.svg' alt='cube' />
          <a href='/'>
            <h1 className='site-name'>SubFusion</h1>
          </a>
        </div>
      </div>
      <main>
        <Text className='site-name'>Welcome</Text>
        <Button
          variant='soft'
          color='cyan'
          size='3'
          onClick={subscriptionClick}
        >
          SHOP
        </Button>
      </main>
    </>
  );
}
