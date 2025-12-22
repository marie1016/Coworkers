export default function CommentSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index: number) => (
        // eslint-disable-next-line react/jsx-key
        <div
          role="status"
          className="mt-4 flex animate-pulse flex-col gap-4 shadow"
          // eslint-disable-next-line react/no-array-index-key
          key={index}
        >
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-28 rounded-full bg-text-default dark:bg-gray-600" />
            <div className="h-4 w-2.5 rounded-full bg-text-default dark:bg-gray-700" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-36 rounded-full bg-text-default dark:bg-gray-600" />
            <div className="h-2.5 w-10 rounded-full bg-text-default dark:bg-gray-600" />
          </div>
          <hr className="border-t border-border-primary" />
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
}
