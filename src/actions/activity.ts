"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { AddActivitySchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const addActivity = async (values: z.infer<typeof AddActivitySchema>) => {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Unauthorized" };
    }

    const validatedFields = AddActivitySchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { stopId, name, type, cost, date, time } = validatedFields.data;

    // Verify ownership
    const stop = await db.stop.findUnique({
        where: { id: stopId },
        include: { trip: true }
    });

    if (!stop || stop.trip.userId !== (await db.user.findUnique({ where: { email: session.user.email } }))?.id) {
        return { error: "Stop not found or unauthorized!" };
    }

    try {
        await db.activity.create({
            data: {
                stopId,
                name,
                type,
                cost,
                date,
                time,
                status: "planned",
            },
        });

        revalidatePath(`/dashboard/trips/${stop.tripId}`);
        return { success: "Activity added!" };
    } catch {
        return { error: "Failed to add activity." };
    }
};
