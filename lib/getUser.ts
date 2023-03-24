export const getUser = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch user.');
  } else {
    console.log('Successfully fetched user.');
    const user = await response.json();
    return user;
  }
};
