import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";

import Article from "./models/article.model";


const startServer = async () => {

    dotenv.config();

    database.connect();

    const app: Express = express();
    const port: number | string = process.env.PORT || 3000;

    // // Rest API
    // app.get("/articles", async (req: Request, res: Response) => {
    //   const articles = await Article.find({ deleted: false });
    //   res.json({
    //     articles: articles,
    //   });
    // });

    // GraphQL API
    const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    });


    await apolloServer.start();

    app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(apolloServer)
    );

    app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`GraphQL API is running at http://localhost:${port}/graphql`);
    });
};

startServer();

