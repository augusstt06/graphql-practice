import { gql, useQuery } from '@apollo/client';

import { GQLPosts } from '@/types';

const GET_POSTS = gql`
  query GetPosts {
    posts {
      userId
      id
      title
      body
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Occured: {error.message}</p>;
  console.log(data, '?');
  return (
    <section>
      <ul>
        {data.map((data: GQLPosts) => (
          <li key={data.id}>{data.title}</li>
        ))}
      </ul>
    </section>
  );
};

export default Posts;
