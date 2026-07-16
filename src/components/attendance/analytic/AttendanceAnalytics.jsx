// import { useMemo, useState } from "react";

// import { Search } from "lucide-react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { Input } from "@/components/ui/input";

// import StudentAttendanceDetailsDialog from "../StudentAttendanceDetailsDialog";
// import AttendanceAnalyticsTable from "./AttendanceAnalyticsTable";

// import { useAttendanceAnalytics } from "@/hooks/useAttendanceAnalytics";

// export default function AttendanceAnalytics() {


//   const [search, setSearch] = useState("");

//   const [selectedStudent, setSelectedStudent] = useState(null);

//   const [dialogOpen, setDialogOpen] = useState(false);

//   const {

//     offerings,

//     selectedOffering,

//     setSelectedOffering,

//     students,

//     loadingOfferings,

//     loadingStudents,

// } = useAttendanceAnalytics();

//   function handleView(student) {

//     setSelectedStudent(student);

//     setDialogOpen(true);

//   }

//   const filteredStudents = useMemo(() => {

//     return students.filter(student =>

//       student.studentName
//         .toLowerCase()
//         .includes(search.toLowerCase()) ||

//       String(student.registrationNumber)
//         .includes(search)

//     );

//   }, [students, search]);

//   return (

//     <div className="space-y-6">

//       <div className="rounded-3xl border bg-white p-6 shadow-sm">

//         <h2 className="text-xl font-semibold">
//           Student Attendance Analytics
//         </h2>

//         <p className="mt-1 text-sm text-muted-foreground">
//           View attendance percentage of students for each subject offering.
//         </p>

//         <div className="mt-6 grid gap-4 lg:grid-cols-2">

//           <Select
//             value={selectedOffering}
//             onValueChange={setSelectedOffering}
//           >

//             <SelectTrigger>

//               <SelectValue placeholder="Select Subject Offering" />

//             </SelectTrigger>

//             <SelectContent>

//               {offerings.map(offering => (

//                 <SelectItem
//                   key={offering.id}
//                   value={String(offering.id)}
//                 >

//                   {offering.subjectName} • {offering.departmentCode}-{offering.sectionName} • {offering.batchName}

//                 </SelectItem>

//               ))}

//             </SelectContent>

//           </Select>

//           <div className="relative">

//             <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

//             <Input
//               className="pl-10"
//               placeholder="Search student..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//             />

//           </div>

//         </div>

//       </div>

//       {selectedOffering && (

//       <AttendanceAnalyticsTable
//     students={filteredStudents}
//     subjectOfferingId={selectedOffering}
//     onView={handleView}
// />

//       )}

//       <StudentAttendanceDetailsDialog
//         open={dialogOpen}
//         onOpenChange={setDialogOpen}
//         student={selectedStudent}
//         subjectOfferingId={selectedOffering}
//       />

//     </div>

//   );

// }


import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

import AttendanceAnalyticsTable from "./AttendanceAnalyticsTable";

import AdminAnalyticsFilter from "./filters/AdminAnalyticsFilter";
import FacultyAnalyticsFilter from "./filters/FacultyAnalyticsFilter";

import AdminStudentAttendanceDialog from "@/components/attendance/analytic/dialog/AdminStudentAttendanceDialog";
import StudentSubjectAttendanceDialog from "@/components/attendance/analytic/dialog/StudentSubjectAttendanceDialog";

export default function AttendanceAnalytics() {
  const { user } = useAuth();

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [attendanceFilter, setAttendanceFilter] = useState("ALL");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [selectedOfferingId, setSelectedOfferingId] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);


  function handleView(student) {
    setSelectedStudent(student);
    setDetailsOpen(true);
  }

const filteredStudents = useMemo(() => {
  const keyword = search.trim().toLowerCase();

  return students.filter((student) => {
    const matchesSearch =
      student.studentName.toLowerCase().includes(keyword) ||
      String(student.registrationNumber).includes(keyword);

    const percentage = student.percentage;

    let matchesAttendance = true;

    switch (attendanceFilter) {
      case "90":
        matchesAttendance = percentage >= 90;
        break;

      case "75":
        matchesAttendance =
          percentage >= 75 && percentage < 90;
        break;

      case "60":
        matchesAttendance =
          percentage >= 60 && percentage < 75;
        break;

      case "LOW":
        matchesAttendance = percentage < 60;
        break;

      default:
        matchesAttendance = true;
    }

    return matchesSearch && matchesAttendance;
  });
}, [students, search, attendanceFilter]);

  const isAdmin = user?.role === "ADMIN";

  return (
    <div className="space-y-6">

      {isAdmin ? (
    <AdminAnalyticsFilter
        setStudents={setStudents}
        setLoading={setLoading}
    />
) : (
    <FacultyAnalyticsFilter
        setStudents={setStudents}
        setLoading={setLoading}
        setSelectedOfferingId={setSelectedOfferingId}
    />
)}

      <div className="grid gap-4 md:grid-cols-2">

  <div className="relative">

    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search student..."
      className="pl-10"
    />

  </div>

  <Select
    value={attendanceFilter}
    onValueChange={setAttendanceFilter}
  >

    <SelectTrigger>

      <SelectValue placeholder="Attendance Filter" />

    </SelectTrigger>

    <SelectContent>

      <SelectItem value="ALL">
        All Students
      </SelectItem>

      <SelectItem value="90">
        90% and above
      </SelectItem>

      <SelectItem value="75">
        75% - 89%
      </SelectItem>

      <SelectItem value="60">
        60% - 74%
      </SelectItem>

      <SelectItem value="LOW">
        Below 60%
      </SelectItem>

    </SelectContent>

  </Select>

</div>

      <AttendanceAnalyticsTable
        students={filteredStudents}
        loading={loading}
        onView={handleView}
      />

      {user.role === "ADMIN" ? (
        <AdminStudentAttendanceDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          student={selectedStudent}
        />
      ) : (
        <StudentSubjectAttendanceDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          studentId={selectedStudent?.studentId}
          subjectOfferingId={selectedOfferingId}
        />
      )}

    </div>
  );
}