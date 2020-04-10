const express = require('express');
const { ApolloServer, PubSub } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers/index')
const { DB_CONNECTION } = require('./config');

const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

const app = express();
server.applyMiddleware({ app });

mongoose.connect(DB_CONNECTION, {
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => {
        console.log(`Connection Successful!`)
        return app.listen({ port: 4000 })
    }).then((res) => {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    })
    .catch((err) => console.error(err));
mongoose.Promise = global.Promise;