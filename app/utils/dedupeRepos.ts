import { Repo } from "@/app/types/repo";

export function dedupeRepos(repos: Repo[]) {
  const map = new Map();
  repos.forEach((repo) => map.set(repo.id, repo));
  return Array.from(map.values());
}
