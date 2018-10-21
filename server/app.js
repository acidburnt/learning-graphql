const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./shema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({ schema }));

app.listen(4000, () => {
  console.log('Server started at port 4000.');
});
