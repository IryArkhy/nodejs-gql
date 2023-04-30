const { gql } = require('apollo-server')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  type User {
    id: ID! #GQL doesnt check if it's unique and doesn't know it should be unique
    username: String!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
  }

  type Query {
    pets(type: String!): [Pet]!
  }
`;

module.exports = typeDefs

// Arguments could be added to a query as well as to a specific field.
// They have to be either Scalars or Input types
