"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const toggleTripVisibility = async (tripId: string, isPublic: boolean) => {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Unauthorized" };
    }

    const trip = await db.trip.findUnique({
        where: { id: tripId },
    });

    if (!trip || trip.userId !== (await db.user.findUnique({ where: { email: session.user.email } }))?.id) {
        return { error: "Unauthorized" };
    }

    try {
        await db.trip.update({
            where: { id: tripId },
            data: { isPublic },
        });

        revalidatePath(`/dashboard/trips/${tripId}/settings`);
        return { success: "Visibility updated!" };
    } catch {
        return { error: "Failed to update settings." };
    }
};

import * as z from "zod";
import { SettingsSchema } from "@/schemas";

export const updateSettings = async (values: z.infer<typeof SettingsSchema>) => {
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return { error: "Unauthorized" };
    }

    const validatedFields = SettingsSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name } = validatedFields.data;

    try {
        await db.user.update({
            where: { id: user.id },
            data: { name },
        });

        revalidatePath("/dashboard/profile");
        return { success: "Profile updated!" };
    } catch {
        return { error: "Something went wrong!" };
    }
};
