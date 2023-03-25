export const getUserPosts = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    {
      next: { revalidate: 60 },
    }
  );
  if (!response.ok) {
    return undefined;
  } else {
    console.log('Successfully fetched user posts.');
    const user = await response.json();
    return user;
  }
};
