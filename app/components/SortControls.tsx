type Props = {
  sortType: string;
  setSortType: (type: string) => void;
};

export default function SortControls({ sortType, setSortType }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setSortType("default")}
        className="border-2 rounded-md border-zinc-200 px-3 py-1.5 text-sm transition dark:border-zinc-700 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Default
      </button>
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        {" "}
        Sort By:{" "}
      </span>
      <button
        onClick={() => setSortType("updated")}
        className={`border-2 rounded-md border-zinc-200 px-3 py-1.5 text-sm transition dark:border-zinc-700 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 ${sortType} === "updated" ? "font-bold" : ""`}
      >
        Recently Updated
      </button>

      <button
        onClick={() => setSortType("stars")}
        className={`border-2 rounded-md border-zinc-200 px-3 py-1.5 text-sm transition dark:border-zinc-700 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800
                ${sortType} === "stars" ? "font-bold" : ""`}
      >
        Stars
      </button>

      <button
        onClick={() => setSortType("name")}
        className={`border-2 rounded-md border-zinc-200 px-3 py-1.5 text-sm transition dark:border-zinc-700 bg-white text-zinc-700 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800
                ${sortType} === "name" ? "font-bold" : ""`}
      >
        Name
      </button>
    </div>
  );
}
