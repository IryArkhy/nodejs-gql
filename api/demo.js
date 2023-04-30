const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const typeDefs = gql`
    """
    Do things here to show up in documentation
    """
    enum ShoeType {
        JORDAN
        NIKE
        ADIDDAS
    }

    type User {
        email: String!
        avatar: String!
        friends: [User]! # non null field
    }

    type Shoe {
        brand: ShoeType!
        size: Int!
    }

    input ShoesInput {
        brand: ShoeType
        size: Int
    }

    input NewShoeInput {
        brand: ShoeType!
        size: Int!        
    }

    type Query {
        me: User!
        shoes(input: ShoesInput): [Shoe]!
    }

    type Mutation {
        newShoe(input: NewShoeInput!): Shoe!
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
                { brand: 'NIKE', size: 12 },
                { brand: 'ADIDDAS', size: 14 }
            ].filter(s => s.brand === input.brand)
        },
    },
    Mutation: {
        newShoe(_, { input }, context) {
            return input
        }
    }
};

const server = new ApolloServer({
    typeDefs, // could be an array
    resolvers,
});

server.listen(4000)
    .then(() => console.log('on  port 4000'));
