import { Controller } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";

export default function FormTextarea({
  control,
  name,
  label,
  placeholder,
  rows = 4,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">{label}</label>

          <Textarea
            {...field}
            rows={rows}
            placeholder={placeholder}
            className="resize-none rounded-xl"
          />

          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
