import {
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Award,
} from "lucide-react";

function SummaryCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  valueColor,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className={`mt-2 text-3xl font-bold ${valueColor}`}>{value}</h2>
        </div>

        <div className={`rounded-2xl p-3 ${iconBg}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

export default function AssignmentSummary({ assignments }) {
  const pending = assignments.filter(
  (a) => a.submissionStatus === "PENDING"
).length;

const submitted = assignments.filter(
  (a) => a.submissionStatus === "SUBMITTED"
).length;

const overdue = assignments.filter(
  (a) => a.late && a.submissionStatus !== "GRADED"
).length;

const graded = assignments.filter(
  (a) => a.marksAwarded != null
);

const average =
  graded.length > 0
    ? Math.round(
        graded.reduce(
          (sum, a) => sum + (a.marksAwarded / a.maxMarks) * 100,
          0
        ) / graded.length
      )
    : 0;
    
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Pending"
        value={pending}
        icon={ClipboardList}
        iconBg="bg-yellow-100"
        iconColor="text-yellow-700"
        valueColor="text-yellow-700"
      />

      <SummaryCard
        title="Submitted"
        value={submitted}
        icon={CheckCircle2}
        iconBg="bg-green-100"
        iconColor="text-green-700"
        valueColor="text-green-700"
      />

      <SummaryCard
        title="Overdue"
        value={overdue}
        icon={AlertTriangle}
        iconBg="bg-red-100"
        iconColor="text-red-700"
        valueColor="text-red-700"
      />

      <SummaryCard
        title="Average Score"
        value={`${average}%`}
        icon={Award}
        iconBg="bg-blue-100"
        iconColor="text-blue-700"
        valueColor="text-blue-700"
      />
    </div>
  );
}
