import { Loader2 } from "lucide-react";

// import { useAuth } from "@/context/AuthContext";
import { useAuth } from "@/hooks/useAuth";

import StudentProfile from "@/components/profile/StudentProfile";
import FacultyProfile from "@/components/profile/FacultyProfile";

import { useStudentProfile } from "@/hooks/useStudentProfile";
import { useFacultyProfile } from "@/hooks/useFacultyProfile";

export default function Profile() {
  const { user } = useAuth();

  if (user.role === "STUDENT") {
    return <StudentProfileContainer />;
  }

  if (user.role === "FACULTY") {
    return <FacultyProfileContainer />;
  }

  return null;
}

function StudentProfileContainer() {
  const { student, loading } = useStudentProfile();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <StudentProfile student={student} />;
}

function FacultyProfileContainer() {
  const { faculty, loading } = useFacultyProfile();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <FacultyProfile faculty={faculty} />;
}