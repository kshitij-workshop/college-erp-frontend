import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  "Add Student",
  "Add Faculty",
  "Add Department",
];

export default function QuickActions() {

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">

        Quick Actions

      </h2>

      <div className="space-y-3">

        {actions.map((action) => (

          <Button
            key={action}
            className="h-11 w-full justify-start rounded-xl"
          >

            <Plus className="mr-2 h-4 w-4" />

            {action}

          </Button>

        ))}

      </div>

    </div>
  );
}