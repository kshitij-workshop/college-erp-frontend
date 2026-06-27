import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FormSelect({
  control,
  name,
  label,
  placeholder,
  options = [],
  onValueChange,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2 min-w-0">

          <label className="text-sm font-medium">
            {label}
          </label>

          <Select
            value={field.value ? String(field.value) : ""}
            onValueChange={(value) => {

              field.onChange(Number(value));

              onValueChange?.(Number(value));

            }}
          >

            <SelectTrigger className="w-full min-w-0 h-11 rounded-xl" >

              <SelectValue className="truncate" placeholder={placeholder} />

            </SelectTrigger>

            <SelectContent>

              {options.map((item) => (

                <SelectItem
                  key={item.id}
                  value={String(item.id)}
                >
                  {item.name}
                </SelectItem>

              ))}

            </SelectContent>

          </Select>

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