import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { timeSlotSchema } from "@/schemas/timeSlotSchema";
import { defaultTimeSlotValues } from "@/constants/timeSlotDefaults";

import { createTimeSlot, updateTimeSlot } from "@/api/timeSlotApi";

export function useTimeSlotForm(timeSlot, onSuccess) {
  const form = useForm({
    resolver: zodResolver(timeSlotSchema),
    defaultValues: defaultTimeSlotValues,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!timeSlot) {
      form.reset(defaultTimeSlotValues);
      return;
    }

    form.reset({
      label: timeSlot.label,
      startTime: timeSlot.startTime,
      endTime: timeSlot.endTime,
    });
  }, [timeSlot, form]);

  async function onSubmit(values) {
    try {
      setLoading(true);

      if (timeSlot) {
        await updateTimeSlot(timeSlot.id, values);
        toast.success("Time slot updated successfully");
      } else {
        await createTimeSlot(values);
        toast.success("Time slot created successfully");
      }

      form.reset(defaultTimeSlotValues);
      onSuccess?.();
    } catch (error) {
      console.error(error);

      toast.error(error?.response?.data?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    onSubmit,
  };
}
