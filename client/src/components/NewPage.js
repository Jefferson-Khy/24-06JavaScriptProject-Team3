import React, { useState, useEffect } from 'react';

export default function NewPage() {
  const [accountID, setAccountID] = useState('');

  useEffect(() => {
    const storedAccountID = localStorage.getItem('accountID');
    if (storedAccountID) {
      setAccountID(storedAccountID);
    } else {
      console.error('Account ID not found in local storage');
    }
  }, []);
  return (
    <>
      <h1>Account ID: {accountID}</h1>
    </>
  );
}
