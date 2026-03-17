export async function getGitHubRepos(username: string, page: number) {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(
      username,
    )}/repos?per_page=11&page=${page}&sort=updated`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch repositories");
  }
  return res.json();
}
