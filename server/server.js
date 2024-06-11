const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
