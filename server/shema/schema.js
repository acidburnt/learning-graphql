const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

const books = [
  {
    id: '1',
    name: 'Name of the wind',
    genre: 'Fantasy',
    authorId: '2',
  },
  {
    id: '2',
    name: 'Potop',
    genre: 'Fantasy',
    authorId: '3',
  },
  {
    id: '3',
    name: 'Ubik',
    genre: 'Sci-fi',
    authorId: '1',
  },
  {
    id: '4',
    name: 'Odyseja kosmiczna',
    genre: 'Sci-fi',
    authorId: '2',
  },
  {
    id: '5',
    name: 'Muminki',
    genre: 'For Children',
    authorId: '1',
  },
  {
    id: '6',
    name: 'Gone with the wind',
    genre: 'Fantasy',
    authorId: '3',
  },
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
    author: {
      type: AuthorType,
      resolve(parent) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return _.filter(books, { authorId: parent.id });
      },
    },
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
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
