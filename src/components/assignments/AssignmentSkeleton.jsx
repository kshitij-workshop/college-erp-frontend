export default function AssignmentSkeleton() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm animate-pulse">
      <div className="h-5 w-24 rounded bg-slate-200" />

      <div className="mt-5 h-7 w-3/4 rounded bg-slate-200" />

      <div className="mt-6 h-4 w-1/2 rounded bg-slate-200" />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="h-24 rounded-2xl bg-slate-100" />

        <div className="h-24 rounded-2xl bg-slate-100" />
      </div>

      <div className="mt-6 h-14 rounded-2xl bg-slate-100" />
    </div>
  );
}
