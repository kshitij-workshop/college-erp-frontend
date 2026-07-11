import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { roomSchema } from "@/schemas/roomSchema";
import { defaultRoomValues } from "@/constants/roomDefaults";

import { createRoom, updateRoom } from "@/api/roomApi";

export function useRoomForm(room, onSuccess) {
  const form = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: defaultRoomValues,
  });

  const [loading, setLoading] = useState(false);

  // ==========================================
  // Reset Form
  // ==========================================

  useEffect(() => {
    if (!room) {
      form.reset(defaultRoomValues);
      return;
    }

    form.reset({
      roomNumber: room.roomNumber,
      capacity: room.capacity,
      roomType: room.roomType,
    });
  }, [room, form]);

  // ==========================================
  // Submit
  // ==========================================

  async function onSubmit(values) {
    try {
      setLoading(true);

      if (room) {
        await updateRoom(room.id, values);

        toast.success("Room updated successfully");
      } else {
        await createRoom(values);

        toast.success("Room created successfully");
      }

      form.reset(defaultRoomValues);

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
