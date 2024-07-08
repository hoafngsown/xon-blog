import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonComment() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-14 w-14 rounded-full sm:h-16 sm:w-16 md:h-20 md:w-20" />
      <div className="space-y-2 md:space-y-4">
        <Skeleton className="h-6 w-full min-w-[250px] md:w-[400px]" />
        <Skeleton className="h-6 w-[70%] min-w-[200px] md:w-[350px]" />
      </div>
    </div>
  );
}
