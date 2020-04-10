const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const { DB_CONNECTION } = require('./config');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const books = [
    {
        title: 'Circle Trilogy',
        author: 'Ted Dekker',
    },
    {
        title: 'House',
        author: 'Ted Dekker & Frank Peretti',
    },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        books: () => books,
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const app = express();

app.get('/', (req, res) => {
    return res.send('You are on home!');
});

server.applyMiddleware({ app });

mongoose.connect(DB_CONNECTION, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`connection successful!`)
        return app.listen({ port: 4000 })
    }).then((res) => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })
    .catch((err) => console.error(err));
mongoose.Promise = global.Promise;