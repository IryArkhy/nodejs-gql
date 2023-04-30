/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    // demo(_, args, contextObject) {
    //   const  { models } = contextObject;
    //   // models.Pet.findMany({})
    // },
    // user(_, args, { models }) {
    //   return models.User.findOne();
    // },
    pets(_initialValue, args, { models }, _info) {
      const { input } = args;

      return models.Pet.findMany(input);
    },
    pet(_initialValue, { input }, { models }) {
      return models.Pet.findOne(input);
    }
  },
  // Mutation: {
    
  // },
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
