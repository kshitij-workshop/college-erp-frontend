import { Controller } from "react-hook-form";

import { Switch } from "@/components/ui/switch";

export default function FormSwitch({ control, name, label, description }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <label
                htmlFor={name}
                className="text-sm font-medium cursor-pointer"
              >
                {label}
              </label>

              {description && (
                <p className="text-sm text-slate-500">{description}</p>
              )}
            </div>

            <Switch
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </div>

          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
