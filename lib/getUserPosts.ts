export const getUserPosts = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch posts for userId.');
  } else {
    console.log('Successfully fetched user posts.');
    const user = await response.json();
    return user;
  }
};
