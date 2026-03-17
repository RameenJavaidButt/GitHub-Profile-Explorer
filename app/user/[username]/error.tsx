"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4">
      <span className="text-red-500">
        Something went wrong: {error.message}
      </span>
      <button
        onClick={() => reset()}
        className="rounded bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-50 dark:text-zinc-900"
      >
        Try again
      </button>
    </div>
  );
}
