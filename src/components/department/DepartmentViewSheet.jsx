import { useEffect, useState } from "react";

import { getDepartmentById } from "@/api/departmentApi";

import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

import { Building2, FileText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import EntitySection from "@/components/common/EntitySection";
import DetailField from "@/components/common/DetailField";

export default function DepartmentViewSheet({
  open,
  onOpenChange,
  departmentId,
}) {

  const [department, setDepartment] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!open || !departmentId) return;

    async function loadDepartment() {

      try {

        setLoading(true);

        const response = await getDepartmentById(departmentId);

        setDepartment(response.data.data);

      } finally {

        setLoading(false);

      }

    }

    loadDepartment();

  }, [open, departmentId]);

  return (

    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent className="w-full sm:max-w-2xl p-0 bg-slate-50">

        {loading ? (

          <div className="space-y-6 p-8">

            <Skeleton className="mx-auto h-20 w-20 rounded-full" />

            <Skeleton className="mx-auto h-8 w-60" />

            <Skeleton className="mx-auto h-5 w-24" />

            <Skeleton className="h-36 rounded-2xl" />

          </div>

        ) : department ? (

          <>

            {/* Hero */}

            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-10 text-white">

              <div className="flex flex-col items-center text-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10 shadow-lg">

                  <Building2 className="h-12 w-12 text-white" />

                </div>

                <h1 className="mt-5 text-3xl font-bold">

                  {department.name}

                </h1>

                <p className="mt-2 text-blue-100">

                  {department.code}

                </p>

                <Badge
                  className={
                    department.active
                      ? "mt-5 bg-green-100 text-green-700"
                      : "mt-5 bg-red-100 text-red-700"
                  }
                >
                  {department.active ? "ACTIVE" : "INACTIVE"}
                </Badge>

              </div>

            </div>

            {/* Body */}

            <div className="space-y-6 p-8">

              <EntitySection
                icon={FileText}
                title="Department Information"
              >

                <div className="grid gap-6 md:grid-cols-2">

                  <DetailField
                    className="md:col-span-2"
                    label="Department Name"
                    value={department.name}
                  />

                  <DetailField
                    label="Department Code"
                    value={department.code}
                  />

                  <DetailField
                    label="Status"
                    value={
                      department.active
                        ? "ACTIVE"
                        : "INACTIVE"
                    }
                  />

                  <DetailField
                    className="md:col-span-2"
                    label="Description"
                    value={
                      department.description ||
                      "-"
                    }
                  />

                </div>

              </EntitySection>

            </div>

          </>

        ) : null}

      </SheetContent>

    </Sheet>

  );

}