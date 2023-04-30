const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
    type User {
        email: String!
        avatar: String!
        friends: [User]! # non null field
    }

    type Query {
        me: User!
        # friends: [User]!
    }
`;

const resolvers = {
    Query: {
        me() {
            return {
                email: 'yoda@mail.com',
                avatar: 'https://yoda.png',
                friends: [],
            }
        },
        // friends() {
        //     return []
        // }
    }
};

const server = new ApolloServer({
    typeDefs, // could be an array
    resolvers,
});

server.listen(4000)
    .then(() => console.log('on  port 4000'));
