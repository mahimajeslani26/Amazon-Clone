const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');
const { request } = require('express');

const stripe = require('stripe')(
  'sk_test_51HQEDKAvaXpsex7YyJEclPTPBGY3KZ1GK6R9L8Hc0jdAUjQNBwNjaffGSs0h4as3MaXFgeU2k46I46pQBGZK4U9k00p3sT7GW8'
);

//App

//1. App config
const app = express();

//2. middle wares
app.use(cors({ origin: true }));
app.use(express.json());

//3. API routes
app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.post('/payments/create', async (req, res) => {
  const total = req.query.total;
  console.log('Payment request recieved for : ', total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits
    currency: 'inr',
    description: 'stripe integration testing',
  });

  //200 res : OK
  //201 : res : OK - Created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//4. listen

exports.api = functions.https.onRequest(app);
