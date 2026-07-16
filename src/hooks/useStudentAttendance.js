import { useEffect, useState } from "react";

import { getStudentAttendanceDashboard } from "@/api/attendanceApi";

export function useStudentAttendance() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    async function refresh() {

        try {

            setLoading(true);

            const response =
                await getStudentAttendanceDashboard();

            setDashboard(response.data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        refresh();

    }, []);

    return {

        dashboard,

        loading,

        refresh,

    };

}