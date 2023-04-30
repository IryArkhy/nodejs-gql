/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    user(_, args, { models }) {
      return models.User.findOne();
    },
    pets(_initialValue, args, { models }, _info) {
      const { input } = args;

      return models.Pet.findMany(input);
    },
    pet(_initialValue, { input }, { models }) {
      return models.Pet.findOne(input);
    }
  },
  Mutation: {
    newPet(_, { input }, context) {
      return context.models.Pet.create(input);
    },
    updatePet(_, { input }, context) {
      const { id, ...restData } = input;
      return context.models.Pet.updateOne(id, restData);
    },
    deletePet(_, { input }, context) {
      return context.models.Pet.deleteOne(id);
    }
  },
  Pet: {
    // id() {
    //   return Math.random().toString()
    // }
    // img(pet) {
    //   return pet.type === 'DOG'
    //     ? 'https://placedog.net/300/300'
    //     : 'http://placekitten.com/300/300'
    // }
  },
  // User: {
    
  // }
}
