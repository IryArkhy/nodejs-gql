const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone') ;
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {models, db} = require('./db')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context({ req, res }) {
  //   /**
  //    * AUTHORIZATION
  //    * 
  //    * The easiest way to block you api is here
  //    * 
  //    * Example
  //    * const jwt = req.headers.authorization;
  //    */

  //   const user = models.User.findOne();
  //   const ctx = { models, db, user };
  //   return ctx;
  // }
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async (req, res) => {
    const user = models.User.findOne();
    const ctx = { models, db, user };
    return ctx;
  }
}).then(({url}) => console.log(`🚀  Server ready at: ${url}`))



// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// })
