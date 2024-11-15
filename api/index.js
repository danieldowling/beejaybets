// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 

// Middleware to parse incoming JSON requests
app.use(express.json());

// Airtable API URL and Key from environment variables
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_ACCESS_TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
const AIRTABLE_TABLE_SIGNUP = process.env.AIRTABLE_TABLE_SIGNUP;  // Airtable table name where data will be stored

// Endpoint to handle form submissions
app.post('/api/signup', async (req, res) => {
  try {
    const { username, firstName, lastName, email, phoneNumber } = req.body;

    // Format the data to match Airtable's schema
    const data = {
      fields: {
        UserName: username,
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        PhoneNumber: phoneNumber,
      },
    };

    // Send data to Airtable using Airtable's REST API
    const response = await axios.post(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_SIGNUP}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return a success response if data was successfully added to Airtable
    res.status(200).json({ message: 'Form data submitted successfully!', data: response.data });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});

//Endpoint to get newly created user info for thank you page
app.get('/api/get-user/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_SIGNUP}?filterByFormula={Username}="${username}"`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_ACCESS_TOKEN}`,
        },
      }
    );

    if (response.data.records.length > 0) {
      const user = response.data.records[0].fields;
      res.status(200).json(user);  // Return user data from Airtable
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user from Airtable' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});