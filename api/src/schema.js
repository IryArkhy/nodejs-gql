const { gql } = require('graphql-tag')

/**
 * Type Definitions for our Schema using the SDL.
 */
const typeDefs = gql`
  enum PetType {
    DOG
    CAT
    FISH
  }

  type User {
    id: ID! #GQL doesnt check if it's unique and doesn't know it should be unique
    username: String!
    pets: [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: PetType!
    img(height: String, width: String): String
    owner: User!
  }

  input PetsInput {
    name: String
    type: PetType
  }

  input PetInput {
    id: ID!
  }

  input NewPetInput {
    name: String!
    type: String!
    img: PetType
  }

  input UpdatePetInput {
    id: ID!
    name: String
    type: PetType
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
