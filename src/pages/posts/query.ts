import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      userId
      id
      title
      body
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($userId: Int!, $title: String!, $body: String!) {
    addPost(userId: $userId, title: $title, body: $body) {
      userId
      id
      title
      body
    }
  }
`;
