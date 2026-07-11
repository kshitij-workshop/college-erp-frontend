import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { timetableSchema } from "@/schemas/timetableSchema";
import { defaultTimetableValues } from "@/constants/timeTableDefaults";

import { createTimetableEntry, updateTimetableEntry } from "@/api/timetableApi";

import { getSubjectOfferings } from "@/api/subjectOfferingApi";
import { getRooms } from "@/api/roomApi";
import { getTimeSlots } from "@/api/timeSlotApi";

export function useTimetableForm(timetable, onSuccess) {
  const form = useForm({
    resolver: zodResolver(timetableSchema),
    defaultValues: defaultTimetableValues,
  });

  const [loading, setLoading] = useState(false);

  const [subjectOfferings, setSubjectOfferings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  // ======================================
  // Load Subject Offerings
  // ======================================

  async function loadSubjectOfferings() {
    try {
      const response = await getSubjectOfferings();

      setSubjectOfferings(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load subject offerings");
    }
  }

  // ======================================
  // Load Rooms
  // ======================================

  async function loadRooms() {
    try {
      const response = await getRooms();

      setRooms(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load rooms");
    }
  }

  // ======================================
  // Load Time Slots
  // ======================================

  async function loadTimeSlots() {
    try {
      const response = await getTimeSlots();

      setTimeSlots(response.data.data);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load time slots");
    }
  }

  useEffect(() => {
    loadSubjectOfferings();
    loadRooms();
    loadTimeSlots();
  }, []);

  // ======================================
  // Reset Form
  // ======================================

  useEffect(() => {
    if (!timetable) {
      form.reset(defaultTimetableValues);

      return;
    }

    form.reset({
      subjectOfferingId: timetable.subjectOfferingId,
      roomId: timetable.roomId,
      timeSlotId: timetable.timeSlotId,
      dayOfWeek: timetable.dayOfWeek,
      academicSession: timetable.academicSession,
    });
  }, [timetable, form]);

  // ======================================
  // Submit
  // ======================================

  async function onSubmit(values) {
    try {
      setLoading(true);

      if (timetable) {
        await updateTimetableEntry(timetable.id, values);

        toast.success("Timetable updated successfully");
      } else {
        await createTimetableEntry(values);

        toast.success("Timetable created successfully");
      }

      form.reset(defaultTimetableValues);

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

    subjectOfferings,

    rooms,

    timeSlots,

    onSubmit,
  };
}
