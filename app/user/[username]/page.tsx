import type { Metadata } from "next";
import { getGitHubUser } from "@/app/lib/getGitHubUser";
import RepoList from "@/app/components/RepoList";
import Link from "next/link";
import Image from "next/image";
type PageProps = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;

  const user = await getGitHubUser(username);

  return {
    title: user
      ? `${user.name ?? user.login} (@${user.login}) • GitHub Profile`
      : `User "${username}" not found • GitHub Profile`,
  };
}

export default async function UserPage({ params }: PageProps) {
  const { username } = await params;

  const user = await getGitHubUser(username);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="w-full max-w-md rounded-xl bg-white px-8 py-10 text-center shadow-lg dark:bg-zinc-900">
          <div className="mb-8 flex justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              <span aria-hidden="true" className="text-lg">
                &larr;
              </span>
              Back to Search
            </Link>
          </div>
          <h1 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            User not found
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            We couldn&apos;t find a GitHub user with the username{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-50">
              {username}
            </span>
            .
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-4xl rounded-xl bg-white px-8 py-10 shadow-lg dark:bg-zinc-900">
        <div className="mb-8 flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
          >
            <span aria-hidden="true" className="text-lg">
              &larr;
            </span>
            Back to Search
          </Link>
        </div>

        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Image
            src={user.avatar_url}
            alt={user.name ?? user.login}
            width={112}
            height={112}
            className="rounded-full border border-zinc-200 object-cover shadow-sm dark:border-zinc-700"
          />

          <div className="flex-1 space-y-1 text-center sm:text-left">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {user.name ?? user.login}
            </h1>
            <p className="text-sm font-mono text-zinc-600 dark:text-zinc-400">
              @{user.login}
            </p>

            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              {user.bio && user.bio.trim().length > 0
                ? user.bio
                : "No bio available"}
            </p>

            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {user.location && user.location.trim().length > 0
                ? user.location
                : "Location not specified"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 rounded-lg bg-zinc-50 px-4 py-3 text-center text-sm dark:bg-zinc-950/40">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Followers
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {user.followers}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Following
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {user.following}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Repos
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {user.public_repos}
            </p>
          </div>
        </div>
        <RepoList username={user.login} />
      </main>
    </div>
  );
}
