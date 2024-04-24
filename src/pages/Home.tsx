import { Link } from 'react-router-dom';

const Home = () => {
  const linkList = [{ title: 'posts', href: '/posts' }];
  return (
    <main>
      <h1>React + Graphql</h1>
      <section>
        {linkList.map((data) => (
          <Link to='/posts' key={data.href}>
            {data.title}
          </Link>
        ))}
      </section>
    </main>
  );
};

export default Home;
