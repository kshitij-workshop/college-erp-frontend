export default function ProfileField({ label, value }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3">
      <p className="text-sm font-medium text-muted-foreground">
        {label}
      </p>

      <p className="sm:col-span-2 text-sm font-medium break-words">
        {value || "-"}
      </p>
    </div>
  );
}