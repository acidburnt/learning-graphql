import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

const BookListUnwrapped = ({ data }) => {
  const { books, loading } = data;
  if (loading) return <p>Loading......</p>;
  return (
    <ul className="book-list">
      {books.map(book => (
        <li key={book.id}>{`${book.name} by ${book.author.name}`}</li>
      ))}
    </ul>
  );
};

BookListUnwrapped.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const BookList = graphql(getBooksQuery)(BookListUnwrapped);
