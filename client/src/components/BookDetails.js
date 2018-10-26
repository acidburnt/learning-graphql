import React from 'react';
import { shape } from 'prop-types';
import { graphql } from 'react-apollo';

import { getBookQUery } from '../queries/queries';

const BookDetailsUnwrapped = ({ data }) => {
  const { books, loading } = data;
  if (loading) return <p>Loading......</p>;
  return (
    <div id="book-details">
      <p>Output book details here</p>
    </div>
  );
};

BookDetailsUnwrapped.propTypes = {
  data: shape({}).isRequired,
};

export const BookDetails = graphql(getBookQUery)(BookDetailsUnwrapped);
