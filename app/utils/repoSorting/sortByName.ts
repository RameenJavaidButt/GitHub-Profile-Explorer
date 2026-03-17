import type { Repo } from "@/app/types/repo";

export function sortByName(repos: Repo[]): Repo[] {
  return [...repos].sort((a, b) => a.name.localeCompare(b.name));
}
