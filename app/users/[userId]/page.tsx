import { Post, User } from '@/types';
import { getUser } from '@/lib/getUser';
import { getUserPosts } from '@/lib/getUserPosts';
import { Suspense } from 'react';
import UserPosts from './components/UserPosts';
import { Metadata } from 'next';

type UserType = {
  params: {
    userId: string;
  };
};

export const generateMetadata = async ({
  params: { userId },
}: UserType): Promise<Metadata> => {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;
  return {
    title: `${user.name}`,
    description: `${user.name} details`,
  };
};

const User = async ({ params: { userId } }: UserType) => {
  // 1st Approach
  // Parallel requests (no waterfall)
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);
  // Wait for both requests to complete
  const [user, userPosts] = await Promise.all([userData, userPostsData]);

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* We created a valid Server Component */}
        {/* @ts-expect-error */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
};

export default User;
