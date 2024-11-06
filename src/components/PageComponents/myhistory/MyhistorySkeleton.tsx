export default function MyhistorySkeleton() {
  return (
    <div
      className="mx-auto h-auto max-w-[75rem] animate-pulse px-6 py-10 shadow"
      role="status"
    >
      <div className="h-6 w-28 rounded-xl bg-background-secondary dark:bg-gray-600" />
      <div className="my-6 flex flex-col gap-10">
        {Array.from({ length: 3 }).map((_, index: number) => (
          // eslint-disable-next-line react/jsx-key
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          >
            <div className="mb-4 h-5 w-36 rounded-xl bg-background-secondary dark:bg-gray-600" />
            <div className="flex flex-col gap-4">
              <div className="h-10 rounded-xl bg-background-secondary dark:bg-gray-700" />
              <div className="h-10 rounded-xl bg-background-secondary dark:bg-gray-600" />
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        ))}
      </div>
    </div>
  );
}
