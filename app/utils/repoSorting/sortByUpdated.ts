import type { Repo } from "@/app/types/repo";

export function sortByUpdated(repos: Repo[]): Repo[] {
  return [...repos].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}
