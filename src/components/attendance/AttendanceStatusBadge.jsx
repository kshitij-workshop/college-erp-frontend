import { Badge } from "@/components/ui/badge";

export default function AttendanceStatusBadge({ status }) {
  const variants = {
    PRESENT: "bg-green-100 text-green-700",
    ABSENT: "bg-red-100 text-red-700",
    LATE: "bg-yellow-100 text-yellow-700",
    LEAVE: "bg-blue-100 text-blue-700",
  };

  return (
    <Badge className={variants[status]}>
      {status}
    </Badge>
  );
}