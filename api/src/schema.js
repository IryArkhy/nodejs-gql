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
    img(height: String, width: String): String
  }

  input PetsInput {
    name: String
    type: String
  }

  input PetInput {
    id: ID!
  }

  input NewPetInput {
    name: String!
    type: String!
    img: String
  }

  input UpdatePetInput {
    id: ID!
    name: String
    type: String
    img: String
  }

  input DeletePetInput {
    id: ID!
  }

  type Query {
    user: User!
    pets(input: PetsInput): [Pet]!
    pet(input: PetInput): Pet
  }

  type Mutation {
    newPet(input: NewPetInput!): Pet!
    updatePet(input: UpdatePetInput!): Pet!
    deletePet(input: DeletePetInput!): Pet!
  }
`;

module.exports = typeDefs

// Arguments could be added to a query as well as to a specific field.
// They have to be either Scalars or Input types

/**
 * A tip: Any field that has an array type, 
 * then you define arguments for that field 
 * to be able to manipulate that array
 */

/**
 * A tip: If you need to manipulate a field data
 * don't use arguments for the field. Use directives.
 */
