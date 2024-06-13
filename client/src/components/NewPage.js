import React, { useEffect, useState } from 'react';
import header from '../assets/header.png';

export default function NewPage() {
  const [accountID, setAccountID] = useState('');
  const [accountDetails, setAccountDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedAccountID = localStorage.getItem('accountID');
    if (storedAccountID) {
      setAccountID(storedAccountID);
      fetchAccountDetails(storedAccountID);
    } else {
      setError('Account ID not found in local storage');
    }
  }, []);

  const fetchAccountDetails = async (storedAccountID) => {
    try {
      const response = await fetch(
        `https://f533-2600-1700-8520-9ba0-900a-87b4-ad47-3176.ngrok-free.app/api/retrieve-account?accountID=${storedAccountID}`,
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
      setAccountDetails(data.accountDetails);
      console.log('Response data:', data);
    } catch (error) {
      setError(`Error retrieving account details: ${error.message}`);
    }
  };

  return (
    <div
      className='min-h-screen bg-cover'
      style={{ backgroundImage: `url(${header})` }}
    >
      <h1>Account ID: {accountID}</h1>
      {error && <p>{error}</p>}
      {accountDetails ? (
        <div>
          <h2>Account Details:</h2>
          <p>{JSON.stringify(accountDetails, null, 2)}</p>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
    </div>
  );
}
