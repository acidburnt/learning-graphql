import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const AddBookUnwrapped = ({ data }) => {
  const { authors, loading } = data;
  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor>
          Book name:
          <input type="text" />
        </label>
      </div>
      <div className="field">
        <label htmlFor>
          Genre:
          <input type="text" />
        </label>
      </div>
      <div className="field">
        <label>
          Author:
          <select id="select">
            {loading ? <option>Loading authors...</option> : <option>Select author</option>}
            {!loading
              && authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
          </select>
        </label>
      </div>
      <button type="button">Save</button>
    </form>
  );
};

AddBookUnwrapped.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const AddBook = graphql(getAuthorsQuery)(AddBookUnwrapped);
