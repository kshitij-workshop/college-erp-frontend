import { useAuth } from "@/hooks/useAuth";

import StudentAssignmentsPage from "@/pages/assignments/StudentAssignmentPage";
import FacultyAssignmentsPage from "@/pages/assignments/FacultyAssignmentpage";

export default function AssignmentPage() {

    const { user } = useAuth();

    switch (user?.role) {

        case "STUDENT":
            return <StudentAssignmentsPage />;

        case "FACULTY": 
        case "ADMIN":
            return <FacultyAssignmentsPage />;

        default:
            return null;
    }
}
