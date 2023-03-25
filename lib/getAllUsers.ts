export const getAllUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    return undefined;
  } else {
    console.log('Successfully fetched users.');
    const users = await response.json();
    return users;
  }
};
