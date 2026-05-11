const SkeletonCard = () => (
  <div className="glass-card animate-pulse">
    <div className="h-52 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
    <div className="mt-4 h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="mt-2 h-6 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="mt-2 h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
    <div className="mt-4 h-10 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
  </div>
);

export default SkeletonCard;
