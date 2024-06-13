import React, { useEffect } from 'react';
import header from '../assets/header.png';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.accountDetails;
};

export default function Profile() {
  const storedAccountID = localStorage.getItem('accountID');

  const { data: accountDetails, error } = useSWR(
    storedAccountID
      ? `https://f533-2600-1700-8520-9ba0-900a-87b4-ad47-3176.ngrok-free.app/api/retrieve-account?accountID=${storedAccountID}`
      : null,
    fetcher
  );

  useEffect(() => {
    if (!storedAccountID) {
      console.error('Account ID not found in local storage');
    }
  }, [storedAccountID]);

  const renderProfileDetails = (profile) => {
    if (!profile) return null;
    const { name, email, birthDateProvided, governmentIDProvided } =
      profile.individual;

    return (
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Profile Details:</h3>
        <p>
          <span className='font-semibold'>Name:</span> {name.firstName}{' '}
          {name.lastName}
        </p>
        <p>
          <span className='font-semibold'>Email:</span> {email}
        </p>
        <p>
          <span className='font-semibold'>Birth Date Provided:</span>{' '}
          {birthDateProvided ? 'Yes' : 'No'}
        </p>
        <p>
          <span className='font-semibold'>Government ID Provided:</span>{' '}
          {governmentIDProvided ? 'Yes' : 'No'}
        </p>
      </div>
    );
  };

  return (
    <div
      className='min-h-screen text-white bg-cover'
      style={{ backgroundImage: `url(${header})` }}
    >
      <div className='container px-4 py-8 mx-auto'>
        <h1 className='mb-4 text-4xl font-bold'>Account Details</h1>

        {error && <p>Error retrieving account details.</p>}
        {!error && !accountDetails && <p>Loading account details...</p>}

        {accountDetails && (
          <div>
            <p>
              <span className='font-semibold'>Account ID:</span>{' '}
              {accountDetails.accountID}
            </p>
            <p>
              <span className='font-semibold'>Account Type:</span>{' '}
              {accountDetails.accountType}
            </p>
            <p>
              <span className='font-semibold'>Display Name:</span>{' '}
              {accountDetails.displayName}
            </p>
            <p>
              <span className='font-semibold'>Mode:</span> {accountDetails.mode}
            </p>
            <p>
              <span className='font-semibold'>Created On:</span>{' '}
              {accountDetails.createdOn}
            </p>
            <p>
              <span className='font-semibold'>Updated On:</span>{' '}
              {accountDetails.updatedOn}
            </p>
            <p>
              <span className='font-semibold'>Verification Status:</span>{' '}
              {accountDetails.verification?.verificationStatus}
            </p>
            <p>
              <span className='font-semibold'>
                Terms of Service Accepted Date:
              </span>{' '}
              {accountDetails.termsOfService?.acceptedDate}
            </p>
            <p>
              <span className='font-semibold'>
                Terms of Service Accepted IP:
              </span>{' '}
              {accountDetails.termsOfService?.acceptedIP}
            </p>

            {accountDetails.capabilities && (
              <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Capabilities:</h3>
                <ul>
                  {accountDetails.capabilities.map((capability, index) => (
                    <li key={index}>
                      {capability.capability}: {capability.status}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {renderProfileDetails(accountDetails.profile)}
          </div>
        )}
      </div>
    </div>
  );
}
