import { getAllUsers } from '@/lib/getAllUsers';
import { User } from '@/types';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Users',
};

const Users = async () => {
  const usersResponse: Promise<User[]> = await getAllUsers();
  const users = await usersResponse;

  return (
    <section>
      <h2>
        <Link href='/'>Back to Home</Link>
      </h2>
      <br />
      {users.map((user: User) => (
        <p key={user.id}>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </p>
      ))}
    </section>
  );
};

export default Users;
