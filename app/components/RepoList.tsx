"use client";

import { useMemo, useState, useEffect } from "react";
import { Repo } from "@/app/types/repo";
import { getGitHubRepos } from "@/app/lib/getGithubRepo";
import { sortByUpdated } from "@/app/utils/repoSorting/sortByUpdated";
import { sortByStars } from "@/app/utils/repoSorting/sortByStars";
import { sortByName } from "@/app/utils/repoSorting/sortByName";
import { toggleFavorite } from "@/app/utils/addToFav/toggleFavorite";
import SortControls from "@/app/components/SortControls";
import { dedupeRepos } from "../utils/dedupeRepos";
import Pagination from "@/app/components/Pagination";

export default function RepoList({ username }: { username: string }) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [sortType, setSortType] = useState("default");
  const [allRepos, setAllRepos] = useState<Repo[]>([]);
  const [favorites, setFavorites] = useFavorites();

  const sortedRepos = useMemo(() => {
    if (sortType === "stars") return sortByStars(allRepos);
    if (sortType === "name") return sortByName(allRepos);
    if (sortType === "updated") return sortByUpdated(allRepos);
    return repos;
  }, [sortType, allRepos, repos]);

  useEffect(() => {
    let ignore: boolean = false;

    async function fetchPageRepos() {
      setLoading(true);
      setError(null);

      try {
        const data: Repo[] = await getGitHubRepos(username, page);
        if (!ignore) {
          setHasNextPage(data.length > 10);
          setRepos(data.slice(0, 10));
          setLoading(false);
        }
      } catch (err: unknown) {
        if (!ignore) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "An error occurred fetching repositories";

          setError(errorMessage);
          setLoading(false);
        }
      }
    }
    fetchPageRepos();
    return () => {
      ignore = true;
    };
  }, [username, page, sortType]);

  useEffect(() => {
    if (sortType === "default") return;

    async function fetchAllRepos() {
      setLoading(true);

      try {
        let page = 1;
        let allData: Repo[] = [];
        let hasMore = true;

        while (hasMore) {
          const data: Repo[] = await getGitHubRepos(username, page);

          allData = [...allData, ...data];

          if (data.length < 10) {
            hasMore = false;
          } else {
            page++;
          }
        }

        setAllRepos(dedupeRepos(allData));
        setLoading(false);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Error fetching all repos";

        setError(errorMessage);
        setLoading(false);
      }
    }

    fetchAllRepos();
  }, [sortType, username]);
  useEffect(() => {
    setRepos([]);
    setAllRepos([]);
    setPage(1); // reset page when username changes
  }, [username]);
  /* useEffect(() => {
         const stored = localStorage.getItem("favorites");
         if (stored) {
             setFavorites(JSON.parse(stored));
         }
     }, []);*/

  function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const stored = localStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored));
    }, []);

    return [favorites, setFavorites] as const;
  }

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => toggleFavorite(id, prev));
  };

  if (loading) {
    return (
      <div className="mt-10 flex justify-center">
        <span className="text-zinc-600 dark:text-zinc-400">
          Loading repositories...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 flex justify-center">
        <span className="text-red-500">{error}</span>
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="mt-10 flex justify-center">
        <span className="text-zinc-600 dark:text-zinc-400">
          No public repositories found.
        </span>
      </div>
    );
  }

  return (
    <section className="mt-12">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Public Repositories
        </h2>

        <SortControls sortType={sortType} setSortType={setSortType} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedRepos.map((repo) => (
          <div
            key={repo.id}
            className="flex flex-col h-full rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
          >
            <button onClick={() => handleToggleFavorite(repo.id)}>
              {favorites.includes(repo.id) ? "❤️" : "❤"}
            </button>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 text-base font-semibold text-zinc-900 hover:underline dark:text-zinc-50 break-words"
            >
              {repo.name}
            </a>

            <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400 flex-1">
              {repo.description || "No description"}
            </p>
            <div className="mt-auto flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 inline align-text-bottom mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.5V13M12 13c3.866 0 7-1.343 7-3V6.5c0-1.657-3.134-3-7-3s-7 1.343-7 3V10c0 1.657 3.134 3 7 3Z"
                  />
                </svg>
                {repo.language || "N/A"}
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.382 2.455a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.539 1.118l-3.382-2.455a1 1 0 00-1.176 0L5.49 15.052c-.783.57-1.838-.197-1.539-1.118l1.286-3.967a1 1 0 00-.364-1.118L1.49 8.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
                {repo.stargazers_count}
              </span>
            </div>
          </div>
        ))}
      </div>

      {sortType === "default" && (
        <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      )}
    </section>
  );
}
