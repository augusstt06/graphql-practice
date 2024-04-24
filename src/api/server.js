import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

const posts = [];

const typeDefs = gql`
  type Post {
    userId: Int
    id: Int
    title: String
    body: String
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(userId: Int, id: Int, title: String, body: String): Post
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
  },
  Mutation: {
    addPost: (_, { userId, id, title, body }) => {
      const newPost = { userId, id, title, body };
      posts.push(newPost);
      return newPost;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
const app = express();
app.use(cors(), express.json(), expressMiddleware(server));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/graphql`);
});
