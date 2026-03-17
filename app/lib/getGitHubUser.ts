import type { GitHubUser } from "@/app/types/githubUser";
export async function getGitHubUser(
  username: string,
): Promise<GitHubUser | null> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}
