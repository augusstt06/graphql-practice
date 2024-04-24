import { useMutation, useQuery } from '@apollo/client';
import { ChangeEvent, useState } from 'react';

import { GQLPosts } from '@/types';

import { ADD_POST, GET_POSTS } from './query';

const Posts = () => {
  const [addPost] = useMutation(ADD_POST);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const { loading, error, data } = useQuery(GET_POSTS);

  const handleAddPost = async () => {
    try {
      const userId = Math.floor(Math.random() * 100) + 1;
      await addPost({ variables: { userId, ...newPost }, refetchQueries: [{ query: GET_POSTS }] });
      setNewPost({ title: '', body: '' });
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Occured: {error.message}</p>;

  return (
    <section>
      <section>
        <input
          type='text'
          placeholder='Title'
          value={newPost.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPost({ ...newPost, title: e.target.value })
          }
        />
        <input
          type='text'
          placeholder='Content'
          value={newPost.body}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewPost({ ...newPost, body: e.target.value })
          }
        />
        <button onClick={handleAddPost}>Add</button>
      </section>
      <ul>
        {data.posts.length !== 0 ? (
          data.posts.map((data: GQLPosts) => (
            <li key={data.id}>
              {data.userId}::{data.title}
            </li>
          ))
        ) : (
          <h1>No Data</h1>
        )}
      </ul>
    </section>
  );
};

export default Posts;
