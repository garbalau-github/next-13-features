import { Post } from '@/types';

type UserPostsType = {
  promise: Promise<Post[]>;
};

const UserPosts = async ({ promise }: UserPostsType) => {
  // Receiving promise from parent component
  const posts = await promise;

  return (
    <div>
      <h2>UserPosts</h2>
      <br />
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <br />
        </article>
      ))}
    </div>
  );
};

export default UserPosts;
