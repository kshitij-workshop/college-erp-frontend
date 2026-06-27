import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function FormInput({
  control,
  name,
  label,
  placeholder,
  type = "text",
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {label}
          </label>

          <Input
          className="h-11 rounded-xl border border-slate-300"
            {...field}
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
          />

          {fieldState.error && (
            <p className="text-sm text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}