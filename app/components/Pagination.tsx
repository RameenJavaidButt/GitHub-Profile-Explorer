type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasNextPage: boolean;
};

export default function Pagination({ page, setPage, hasNextPage }: Props) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        &larr; Previous
      </button>

      <span className="text-sm text-zinc-700 dark:text-zinc-300 pt-2 sm:pt-0">
        Page {page}
      </span>

      <button
        className="inline-flex items-center gap-2 rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        onClick={() => setPage((p) => p + 1)}
        disabled={!hasNextPage}
      >
        Next &rarr;
      </button>
    </div>
  );
}
