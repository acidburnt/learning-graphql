import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getAuthorsQuery } from '../queries/queries';

class AddBookUnwrapped extends React.Component {
  state = {
    name: '',
    genre: '',
    authorId: '',
  };

  submitForm = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  setStateForField = field => e => this.setState({ [field]: e.target.value });

  render() {
    const {
      data: { authors, loading },
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
        <button type="submit">Save</button>
      </form>
    );
  }
}

AddBookUnwrapped.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const AddBook = graphql(getAuthorsQuery)(AddBookUnwrapped);
