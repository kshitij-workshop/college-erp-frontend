import { useEffect, useState } from "react";
import { getDashboard } from "@/api/dashboardApi";

export function useDashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchDashboard() {

        try {

            const res = await getDashboard();

            setDashboard(res.data.data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        fetchDashboard();

    }, []);

    return {
        dashboard,
        loading,
        refresh: fetchDashboard,
    };

}