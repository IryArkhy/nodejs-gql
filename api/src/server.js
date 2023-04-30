const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const {models, db} = require('./db')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ req, res }) {
    /**
     * AUTHORIZATION
     * 
     * The easiest way to block you api is here
     * 
     * Example
     * const jwt = req.headers.authorization;
     */

    const user = models.User.findOne();
    const ctx = { models, db, user };
    return ctx;
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
})
