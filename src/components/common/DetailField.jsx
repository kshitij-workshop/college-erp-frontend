export default function DetailField({
  label,
  value,
  className = "",
}) {
  return (
    <div className={className}>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="text-sm font-semibold text-slate-900 break-words">
        {value || "-"}
      </p>
    </div>
  );
}