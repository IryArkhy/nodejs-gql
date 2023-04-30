const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');

const user = {
    id: 1,
    email: 'yoda@mail.com',
    avatar: 'https://yoda.png',
    shoes: []
};

const shoes = [
    { brand: 'NIKE', size: 12, sport: 'football', userID: 1 },
    { brand: 'TIMBERlAND', size: 14, hasGrip: true, userID: 1 }
];

const typeDefs = gql`
    union Animal = Cat | Snake

    """
    Do things here to show up in the documentation
    """
    enum ShoeType {
        JORDAN
        NIKE
        ADIDDAS
        TIMBERlAND
    }

    type User {
        id: ID!
        email: String!
        avatar: String!
        # friends: [User]! # non null field
        shoes: [Shoe]! #cyclic direct dependency
    }

    # For common fields
    interface Shoe {
        brand: ShoeType!
        size: Int!
        user: User!
    }
    # type Shoe {
    #     brand: ShoeType!
    #     size: Int!
    # }

    # Interfaces are needed when you want to create
    # one query for everything that complies with an interface.
    # For example, you can create only 1 query for everything 
    # that's a Shoe and not create an individual query for Shoe and
    # Sneaker separately
    type Sneaker implements Shoe {
        brand: ShoeType!
        size: Int!
        sport: String!
        user: User!
    }

    type Boot implements Shoe {
        brand: ShoeType!
        size: Int!
        hasGrip: Boolean!
        user: User!
    }

    type Snake {
        length: Int
        poison: Boolean
    }

    type Cat {
        whiskers: Boolean
        paws: Boolean
        color: String
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
        animals: [Animal]
    }

    type Mutation {
        newShoe(input: NewShoeInput!): Shoe!
    }
`;

const resolvers = {
    Query: {
        me() {
            return {
                id: 1,
                email: 'yoda@mail.com',
                avatar: 'https://yoda.png',
                shoes: []
            }
        },
        shoes(_, { input }, info) {
            return shoes;
        },
        animals() {
            return [
                {   
                    whiskers: true,
                    paws: true,
                    color: 'black'
                },
                {
                    length: 10,
                    poison: true
                }
            ]
        }
        
    },
    Mutation: {
        newShoe(_, { input }, context) {
            return input
        }
    },
    Shoe: {
        __resolveType(shoe) {
            if (shoe.sport) return 'Sneaker'
            return 'Boot'
        },
    },
    Sneaker: {
        user(shoe) {
            return user;
        }
    },
    Boot: {
        user(shoe) {
            return user;
        }
    },
    Animal: {
        __resolveType(animal) {
            if (animal.whiskers) return 'Cat'
            return 'Snake'
        }
    },
    User: {
        shoes(user) {
            //TODO: get user id and get all the shoes from DB that have this user id
            return shoes;
        }
    }
};

const server = new ApolloServer({
    typeDefs, // could be an array
    resolvers,
});

server.listen(4000)
    .then(() => console.log('on  port 4000'));

/**
 * Syntax for quering interfaces
 * 
 * 
 {
  shoes {
    brand
    size
    ... on Sneaker {
      sport
      __typename
    }
    ... on Boot {
        hasGrip
        __typename
    }
  }
}
 * Syntax for quering unions
 {
  animals {
    ... on Cat {
      whiskers
      __typename
    }
    ... on Snake {
        length
        __typename
    }
  }
}
 */
