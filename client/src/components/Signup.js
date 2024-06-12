import React, { useEffect } from 'react';
import { loadMoov } from '@moovio/moov-js';
import header from '../assets/header.png';

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

            try {
              const accountTokenResponse = await fetch(
                `https://867f-2600-1700-8520-9ba0-b1c7-ace8-9a98-d726.ngrok-free.app/api/generate-account-token?newAccountID=${accountID}`,
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
              paymentMethods.plaid = {
                env: 'sandbox',
                redirectURL: 'http://localhost:3000',
                receivedRedirectUri: window.location.href.includes(
                  '?oauth_state_id'
                )
                  ? window.location.href
                  : undefined,
                onExit: (...args) => console.log('on plaid exit', ...args),
                onEvent: (...args) => console.log('on plaid event', ...args),
                onLoad: (...args) => console.log('on plaid load', ...args),
                onSuccess: (...args) =>
                  console.log('on plaid success', ...args),
              };
              onboarding.open = false;
              paymentMethods.open = true;
              // paymentMethods.open = false;

              console.log('Payment methods Drop initialized with Plaid');
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
  }, []);

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
