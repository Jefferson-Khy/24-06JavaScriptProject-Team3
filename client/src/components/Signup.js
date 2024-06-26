import React, { useEffect } from 'react';
import { loadMoov } from '@moovio/moov-js';
import header from '../assets/header.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Signup() {
  const navigate = useNavigate();
  let isToastShown = false;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          'https://techhive-app-96b92969b3d5.herokuapp.com/api/generate-token',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const initialToken = data.token;
        const moovInstance = await loadMoov(initialToken);
        console.log('Moov.js loaded with initial token:', moovInstance);

        const onboarding = document.querySelector('moov-onboarding');
        onboarding.token = initialToken;
        onboarding.open = true;
        console.log('Onboarding token set:', onboarding.token);

        onboarding.onResourceCreated = async ({ resourceType, resource }) => {
          if (resourceType === 'account') {
            const { accountID } = resource;
            console.log(`Account created with ID: ${accountID}`);
            localStorage.setItem('accountID', accountID);

            try {
              const accountTokenResponse = await fetch(
                `https://techhive-app-96b92969b3d5.herokuapp.com/api/generate-account-token?newAccountID=${accountID}`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                  },
                }
              );

              if (!accountTokenResponse.ok) {
                throw new Error(
                  `HTTP error! status: ${accountTokenResponse.status}`
                );
              }

              const accountTokenData = await accountTokenResponse.json();
              const accountToken = accountTokenData.token;

              const paymentMethods = document.querySelector(
                'moov-payment-methods'
              );
              paymentMethods.token = accountToken;
              paymentMethods.accountID = accountID;

              onboarding.open = false;
              paymentMethods.open = true;

              paymentMethods.onCancel = () => {
                console.log('User canceled linking payment method');
                paymentMethods.open = false;
                if (!isToastShown) {
                  toast("YOU'RE REGISTERED!!");
                  isToastShown = true;
                }
                navigate('/userdashboard');
              };
            } catch (error) {
              console.error('Error fetching account token:', error);
            }
          }
        };
      } catch (error) {
        console.error('Error fetching initial token:', error);
      }
    };

    fetchToken();
  }, [navigate]);

  return (
    <>
      <div
        className='min-h-screen bg-cover'
        style={{ backgroundImage: `url(${header})` }}
      >
        <moov-onboarding></moov-onboarding>

        <moov-payment-methods></moov-payment-methods>
      </div>
    </>
  );
}
