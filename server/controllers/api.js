const express = require('express');
const dotenv = require('dotenv');
const { Moov, SCOPES } = require('@moovio/node');

dotenv.config();

const router = express.Router();

router.get('/generate-token', async (req, res) => {
  console.log('Environment Variables:');
  console.log('MOOV_ACCOUNT_ID:', process.env.MOOV_ACCOUNT_ID);
  console.log('PUBLIC_KEY:', process.env.PUBLIC_KEY);
  console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY);
  console.log('DOMAIN:', process.env.DOMAIN);

  console.log('Starting token generation...');

  const moov = new Moov({
    accountID: process.env.MOOV_ACCOUNT_ID,
    publicKey: process.env.PUBLIC_KEY,
    secretKey: process.env.PRIVATE_KEY,
    domain: process.env.DOMAIN,
  });

  const scopes = [
    '/accounts.write',
    '/accounts/{accountID}/profile.read',
    '/fed.read',
    '/profile-enrichment.read',
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
  console.log('Environment Variables:');
  console.log('MOOV_ACCOUNT_ID:', process.env.MOOV_ACCOUNT_ID);
  console.log('PUBLIC_KEY:', process.env.PUBLIC_KEY);
  console.log('PRIVATE_KEY:', process.env.PRIVATE_KEY);
  console.log('DOMAIN:', process.env.DOMAIN);

  console.log('Starting token generation...');

  const moov = new Moov({
    accountID: process.env.MOOV_ACCOUNT_ID,
    publicKey: process.env.PUBLIC_KEY,
    secretKey: process.env.PRIVATE_KEY,
    domain: process.env.DOMAIN,
  });

  const scopes = [
    '/accounts.write',
    '/accounts/{accountID}/profile.read',
    '/fed.read',
    '/profile-enrichment.read',
    '/accounts/{newAccountID}/bank-accounts.read',
    '/accounts/{newAccountID}/bank-accounts.write',
    '/accounts/{newAccountID}/capabilities.read',
    '/accounts/{newAccountID}/capabilities.write',
    '/accounts/{newAccountID}/cards.read',
    '/accounts/{newAccountID}/cards.write',
    '/accounts/{newAccountID}/profile.read',
    '/accounts/{newAccountID}/profile.write',
    '/accounts/{newAccountID}/representatives.read',
    '/accounts/{newAccountID}/representatives.write',
  ];

  try {
    console.log('Generating token with scopes:', scopes);
    const { token } = await moov.generateToken(scopes);
    console.log('SECOND TOKEN WORKS ON BACKEND', token);
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

module.exports = router;
