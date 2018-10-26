import React from 'react';
import { shape, func } from 'prop-types';
import { graphql, compose } from 'react-apollo';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBookUnwrapped extends React.Component {
  static propTypes = {
    getAuthorsQuery: shape({}).isRequired,
    addBookMutation: func.isRequired.isRequired,
  };

  state = {
    name: '',
    genre: '',
    authorId: '',
  };

  submitForm = (e) => {
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  setStateForField = field => e => this.setState({ [field]: e.target.value });

  render() {
    const {
      getAuthorsQuery: { authors, loading },
    } = this.props;
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label htmlFor>
            Book name:
            <input type="text" onChange={this.setStateForField('name')} />
          </label>
        </div>
        <div className="field">
          <label htmlFor>
            Genre:
            <input type="text" onChange={this.setStateForField('genre')} />
          </label>
        </div>
        <div className="field">
          <label>
            Author:
            <select id="select" onChange={this.setStateForField('authorId')}>
              {loading ? (
                <option disabled>Loading authors...</option>
              ) : (
                <option>Select author</option>
              )}
              {!loading
                && authors.map(author => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    );
  }
}

export const AddBook = compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBookUnwrapped);
