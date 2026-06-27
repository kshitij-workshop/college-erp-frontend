export default function EntitySection({
  icon: Icon,
  title,
  children,
}) {
  return (
    <section className="rounded-2xl bg-slate-50 p-6">

      <div className="mb-6 flex items-center gap-3">

        {Icon && (
          <Icon className="h-5 w-5 rounded-lg bg-blue-100 p-1 text-blue-600" />
        )}

        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

      </div>

      {children}

    </section>
  );
}