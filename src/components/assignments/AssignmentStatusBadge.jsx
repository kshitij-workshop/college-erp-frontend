export default function AssignmentStatusBadge({ status }) {
  const styles = {
    PENDING: "bg-yellow-100 text-yellow-700",
    SUBMITTED: "bg-green-100 text-green-700",
    GRADED: "bg-blue-100 text-blue-700",
    OVERDUE: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}
