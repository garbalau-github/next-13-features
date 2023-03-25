import { Post, User } from '@/types';
import { getUser } from '@/lib/getUser';
import { getUserPosts } from '@/lib/getUserPosts';
import { getAllUsers } from '@/lib/getAllUsers';
import { Suspense } from 'react';
import UserPosts from './components/UserPosts';
import { Metadata } from 'next';

import { notFound } from 'next/navigation';

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

  if (!user.name) {
    return {
      title: "User doesn't exist",
    };
  }

  return {
    title: `${user.name}`,
    description: `${user.name} details`,
  };
};

const User = async ({ params: { userId } }: UserType) => {
  const userData: Promise<User> = getUser(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  const user = await userData;

  if (!user.name) {
    return notFound();
  }

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        {/* @ts-expect-error */}
        <UserPosts promise={userPostsData} />
      </Suspense>
    </>
  );
};

export const generateStaticParams = async () => {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;
  return users.map((user) => ({
    userId: user.id.toString(),
  }));
};

export default User;
