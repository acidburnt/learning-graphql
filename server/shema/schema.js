const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,
} = graphql;

const books = [
  { id: '1', name: 'Name of the wind', genre: 'Fantasy' },
  { id: '2', name: 'Potop', genre: 'Fantasy' },
  { id: '3', name: 'Ubik', genre: 'Sci-fi' },
];

const authors = [
  { id: '1', name: 'Miro Maro', age: 23 },
  { id: '2', name: 'Andrzej Dudka', age: 34 },
  { id: '3', name: 'Czesław Kowalski', age: 98 },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuertType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
