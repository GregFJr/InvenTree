const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    price: Float
    quantity: Int
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    addProduct(name: String!, description: String, price: Float, quantity: Int): Product
    updateProduct(id: ID!, name: String, description: String, price: Float, quantity: Int): Product
    deleteProduct(id: ID!): Product
  }
`;

module.exports = typeDefs;
