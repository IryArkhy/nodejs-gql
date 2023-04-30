const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
    type User {
        email: String!
        avatar: String!
        friends: [User]! # non null field
    }

    type Shoe {
        brand: String!
        size: Int!
    }

    input ShoesInput {
        brand: String
        size: Int
    }

    type Query {
        me: User!
        shoes(input: ShoesInput): [Shoe]!
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
        shoes(_, { input }) {
            return [
                { brand: 'Nike', size: 12 },
                { brand: 'Adiddas', size: 14 }
            ].filter(s => s.brand === input.brand)
        }
    }
};

const server = new ApolloServer({
    typeDefs, // could be an array
    resolvers,
});

server.listen(4000)
    .then(() => console.log('on  port 4000'));
