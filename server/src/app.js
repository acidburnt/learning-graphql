/* eslint-disable no-console */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

require('dotenv').config();

const app = express();

const ENDPOINT = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${
  process.env.MONGODB_HOST
}`;

mongoose.connect(
  ENDPOINT,
  { useNewUrlParser: true },
);

mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('Server started at port 4000.');
});
