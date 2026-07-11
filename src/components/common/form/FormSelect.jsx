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
  getOptionLabel = (item) => item.name ?? item.label,
  getOptionValue = (item) => item.id ?? item.value,
  renderOption,
  isNumber = true,
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="space-y-2 min-w-0">
          <label className="text-sm font-medium">{label}</label>

          <Select
            value={
              field.value !== undefined &&
              field.value !== null &&
              field.value !== ""
                ? String(field.value)
                : ""
            }
            onValueChange={(value) => {
              const parsedValue = isNumber ? Number(value) : value;

              field.onChange(parsedValue);

              onValueChange?.(parsedValue);
            }}
          >
            <SelectTrigger className="h-11 w-full rounded-xl">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((item) => (
                <SelectItem
                  key={String(getOptionValue(item))}
                  value={String(getOptionValue(item))}
                >
                  {renderOption ? renderOption(item) : getOptionLabel(item)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
