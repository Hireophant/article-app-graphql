// GraphQL API
export const typeDefsUser = `#graphql


    type User {
        id: ID
        fullName: String
        email: String
        token: String
        code: Int
        message: String
    }

    type Query {
        getUser: User,
    }

    
    input RegisterInput {
        fullName: String,
        email: String,
        password: String,
        token: String
    }

    input LoginInput {
        email: String,
        password: String,
    }


    type Mutation {
      
        registerUser(user: RegisterInput): User,
        loginUser(user: LoginInput): User,
        deleteUser(id: ID): String,
        updateUser(id: ID, user: RegisterInput):  User,
    }
`;