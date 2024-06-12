import React, { useEffect } from 'react';
import { loadMoov } from '@moovio/moov-js';
import './global.css';

export default function Signup() {
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          'https://867f-2600-1700-8520-9ba0-b1c7-ace8-9a98-d726.ngrok-free.app/api/generate-token',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
        const data = await response.json();
        const initialToken = data.token;
        const moovInstance = await loadMoov(initialToken);

        const onboarding = document.querySelector('moov-onboarding');

        if ('token' in onboarding) {
          console.log('Current token:', onboarding.token);
          onboarding.token = initialToken;
          console.log('Updated token:', onboarding.token);

          onboarding.open = true;
        } else {
          console.error(
            "The 'moov-onboarding' element does not have a 'token' property."
          );
        }

        console.log('Moov.js initialized successfully:', moovInstance);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <>
      <div className='header-container'>
        <div className='header-content'>
          <img className='cube-icon' src='cube.svg' alt='cube' />
          <h1 className='site-name'>SubFusion</h1>
        </div>
      </div>
      <main>
        <moov-onboarding></moov-onboarding>
        <moov-payment-methods></moov-payment-methods>
      </main>
    </>
  );
}
