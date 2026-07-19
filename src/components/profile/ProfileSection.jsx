export default function ProfileSection({
  title,
  children,
}) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold">
        {title}
      </h2>

      <div className="divide-y">
        {children}
      </div>
    </div>
  );
}