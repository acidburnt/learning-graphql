import React from 'react';
import { shape } from 'prop-types';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

const BookDetailsUnwrapped = (props) => {
  const { book } = props.data;
  return book ? (
    <div id="book-details">
      <h2>{book.name}</h2>
      <p>{`Genre: ${book.genre}`}</p>
      <p>{`By: ${book.author.name}`}</p>
      <p>All books by this author:</p>
      <ul>
        {book.author.books.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  ) : (
    <div>No book selected.</div>
  );
};

BookDetailsUnwrapped.propTypes = {
  data: shape({}).isRequired,
};

export const BookDetails = graphql(getBookQuery, {
  options: props => ({ variables: { id: props.bookId } }),
})(BookDetailsUnwrapped);
