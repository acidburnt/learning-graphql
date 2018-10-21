/* eslint-disable no-console */
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

const app = express();
mongoose.connect(
  'mongodb://admin:test123@ds137913.mlab.com:37913/graphql-lesson',
  { useNewUrlParser: true },
);
mongoose.connection.once('open', () => {
  console.log('Connected to DB');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('Server started at port 4000.');
});
