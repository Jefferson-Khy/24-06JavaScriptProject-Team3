const express = require('express');
const dotenv = require('dotenv');
const { Moov, SCOPES } = require('@moovio/node');
const axios = require('axios');

dotenv.config();

const router = express.Router();

router.get('/generate-token', async (req, res) => {
  console.log('Starting token generation...');
  const moov = new Moov({
    accountID: process.env.MOOV_ACCOUNT_ID,
    publicKey: process.env.PUBLIC_KEY,
    secretKey: process.env.PRIVATE_KEY,
    domain: process.env.DOMAIN,
  });

  const scopes = [
    SCOPES.ACCOUNTS_CREATE,
    SCOPES.ACCOUNTS_READ,
    SCOPES.FED_READ,
    SCOPES.PROFILE_ENRICHMENT_READ,
  ];

  try {
    console.log('Generating token with scopes:', scopes);
    const { token } = await moov.generateToken(scopes);
    console.log('INITIAL TOKEN WORKS ON BACKEND', token);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(`Error fetching token: ${error.message}`);
    if (error.response) {
      return res.status(error.response.status).json({
        message: error.response.statusText,
      });
    } else if (error.request) {
      return res.status(500).json({
        error: 'No response received from the server',
      });
    } else {
      return res.status(500).json({
        error: 'Internal Server Error',
      });
    }
  }
});

router.get('/generate-account-token', async (req, res) => {
  const { newAccountID } = req.query;
  console.log('Received request for newAccountID:', newAccountID);

  const moov = new Moov({
    accountID: process.env.MOOV_ACCOUNT_ID,
    publicKey: process.env.PUBLIC_KEY,
    secretKey: process.env.PRIVATE_KEY,
    domain: process.env.DOMAIN,
  });

  const scopes = [
    `/accounts/${newAccountID}/cards.read`,
    `/accounts/${newAccountID}/cards.write`,
    `/accounts/${newAccountID}/bank-accounts.read`,
    `/accounts/${newAccountID}/bank-accounts.write`,
    `/fed.read`,
  ];

  try {
    console.log('Generating token with scopes:', scopes);
    const { token } = await moov.generateToken(scopes);
    console.log('SECOND TOKEN WORKS ON BACKEND', token);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(`Error generating account token: ${error.message}`);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/retrieve-account', async (req, res) => {
  const { accountID } = req.query;

  if (!accountID) {
    return res.status(400).json({ error: 'Account ID is required' });
  }

  console.log('ACCOUNT ID FOR PROFILE BACKEND:', accountID);

  const moov = new Moov({
    accountID: process.env.MOOV_ACCOUNT_ID,
    publicKey: process.env.PUBLIC_KEY,
    secretKey: process.env.PRIVATE_KEY,
    domain: process.env.DOMAIN,
  });

  const scopes = [`/accounts/${accountID}/profile.read`];

  try {
    console.log('Generating PROFILE token with scopes:', scopes);
    const { token } = await moov.generateToken(scopes);
    console.log('PROFILE TOKEN WORKS ON BACKEND', token);

    const response = await axios.get(
      `https://api.moov.io/accounts/${accountID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Origin:
            'https://f533-2600-1700-8520-9ba0-900a-87b4-ad47-3176.ngrok-free.app',
          Referer:
            'https://f533-2600-1700-8520-9ba0-900a-87b4-ad47-3176.ngrok-free.app',
        },
      }
    );

    console.log('Retrieved account details:', response.data);

    return res.status(200).json(response.data);
  } catch (error) {
    // if (error.response) {
    //   console.error(
    //     `Error response data: ${JSON.stringify(error.response.data)}`
    //   );
    //   console.error(`Error response status: ${error.response.status}`);
    //   console.error(
    //     `Error response headers: ${JSON.stringify(error.response.headers)}`
    //   );
    // } else {
    //   console.error(`Error message: ${error.message}`);
    // }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
