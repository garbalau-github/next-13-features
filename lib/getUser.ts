export const getUser = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  if (!response.ok) {
    return undefined;
  } else {
    console.log('Successfully fetched user.');
    const user = await response.json();
    return user;
  }
};
