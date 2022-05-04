/* prettier-ignore */ const functions = require("firebase-functions");
/* prettier-ignore */ const express = require("express");
/* prettier-ignore */ const cors = require("cors");
/* prettier-ignore */ const stripe = require("stripe")(
  "sk_test_51KtKKaIjb8XnIDssFK8tatR8AlRNuM1ONYoNT1XyRiv4usfndzoGbSeCSUpe4VKDoFTftCit1vkL33lCQ90KrZ5y00vBwc2pT9");

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
  const total = request.query.total;
  console.log('Payment request received for this amount ', total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: 'USD',
  });

  // 201 - OK, something created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// listen command
exports.api = functions.https.onRequest(app);
