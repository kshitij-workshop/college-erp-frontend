import { Skeleton } from "@/components/ui/skeleton";

export default function FacultySkeleton() {

  return (

    <div className="rounded-xl border bg-white p-6 shadow-sm">

      {Array.from({ length: 8 }).map((_, index) => (

        <div
          key={index}
          className="mb-4 flex items-center justify-between"
        >

          <Skeleton className="h-6 w-48"/>

          <Skeleton className="h-6 w-24"/>

          <Skeleton className="h-6 w-32"/>

          <Skeleton className="h-6 w-20"/>

          <Skeleton className="h-8 w-8 rounded-full"/>

        </div>

      ))}

    </div>

  );

}