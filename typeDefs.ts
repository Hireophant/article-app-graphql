// GraphQL API
export const typeDefs = `#graphql
    type Article {
        id: ID
        title: String
        avatar: String
        description: String
    }

    type Query {
        hello: String,
        getListArticle: [Article],
        getArticle(id: ID): Article
    }
`;