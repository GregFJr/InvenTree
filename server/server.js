require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

// GraphQL schema and resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Connect to MongoDB
  mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
    console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`);
  });
}

startServer();
