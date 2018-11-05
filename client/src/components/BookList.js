/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

import { BookDetails } from './BookDetails';

class BookListUnwrapped extends React.Component {
  state = {
    selected: null,
  };

  render() {
    const { books, loading } = this.props.data;
    if (loading) return <p>Loading......</p>;
    return (
      <React.Fragment>
        <ul className="book-list">
          {books.map(book => (
            <li
              onClick={() => {
                this.setState({ selected: book.id });
              }}
              key={book.id}
            >
              {`${book.name} by ${book.author.name}`}
            </li>
          ))}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </React.Fragment>
    );
  }
}

BookListUnwrapped.propTypes = {
  data: PropTypes.shape({
    books: PropTypes.arrayOf.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export const BookList = graphql(getBooksQuery)(BookListUnwrapped);
