require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const mongoose = require('mongoose');

const MONGO_DB_URI = process.env.MONGO_DB_URI;

// GraphQL schema and resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // Connect to MongoDB
  mongoose.connect(MONGO_DB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
    console.log(`GraphQL endpoint: ${apolloServer.graphqlPath}`);
  });
}

startServer();
