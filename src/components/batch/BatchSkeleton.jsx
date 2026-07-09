import { Skeleton } from "@/components/ui/skeleton";

export default function BatchSkeleton() {

  return (

    <div className="rounded-2xl border bg-white p-6 space-y-4">

      <Skeleton className="h-12 w-full rounded-xl" />

      {[1, 2, 3, 4, 5].map((item) => (

        <div
          key={item}
          className="grid grid-cols-4 gap-4"
        >
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
          <Skeleton className="h-10 rounded-lg" />
        </div>

      ))}

    </div>

  );

}