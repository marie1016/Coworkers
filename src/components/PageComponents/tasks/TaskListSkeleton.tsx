import DeferredComponent from "@/components/@shared/DeferredComponent";

export default function TaskListSkeleton() {
  return (
    <DeferredComponent>
      <div
        role="status"
        className="flex animate-pulse items-center gap-3 px-6 shadow sm:px-4"
      >
        <div className="h-4 w-20 rounded-full bg-text-default dark:bg-gray-600" />
        <div className="h-4 w-20 rounded-full bg-text-default dark:bg-gray-600" />
        <div className="h-4 w-20 rounded-full bg-text-default dark:bg-gray-600" />
        <span className="sr-only">Loading...</span>
      </div>
    </DeferredComponent>
  );
}
