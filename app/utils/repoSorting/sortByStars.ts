import type { Repo } from "@/app/types/repo";

export function sortByStars(repos: Repo[]): Repo[] {
  return [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count);
}
