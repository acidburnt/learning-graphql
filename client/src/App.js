import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { BookList } from './components/BookList';
import { AddBook } from './components/AddBook';
import { BookDetails } from './components/BookDetails';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <h1>Reading List</h1>
      <BookList />
      <BookDetails />
      <AddBook />
    </div>
  </ApolloProvider>
);

export default App;
