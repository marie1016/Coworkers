export default function TaskSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index: number) => (
        // eslint-disable-next-line react/jsx-key
        <div
          role="status"
          className="mt-4 flex h-20 animate-pulse flex-col justify-between rounded-lg bg-background-secondary px-4 py-4 shadow"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-28 rounded-full bg-text-default dark:bg-gray-600" />
            <div className="h-4 w-2.5 rounded-full bg-text-default dark:bg-gray-700" />
          </div>
          <div className="h-2.5 w-36 rounded-full bg-text-default dark:bg-gray-600" />
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
}
