"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { AddStopSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const addStop = async (values: z.infer<typeof AddStopSchema>) => {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Unauthorized" };
    }

    const validatedFields = AddStopSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { tripId, city, country, dates } = validatedFields.data;

    // Verify trip ownership
    const trip = await db.trip.findUnique({
        where: { id: tripId },
    });

    if (!trip || trip.userId !== (await db.user.findUnique({ where: { email: session.user.email } }))?.id) {
        return { error: "Trip not found or unauthorized!" };
    }

    try {
        // Get current highest order index
        const lastStop = await db.stop.findFirst({
            where: { tripId },
            orderBy: { orderIndex: 'desc' }
        });

        const newOrderIndex = lastStop ? lastStop.orderIndex + 1 : 0;

        await db.stop.create({
            data: {
                tripId,
                city,
                country,
                arrivalDate: dates.from,
                departureDate: dates.to,
                orderIndex: newOrderIndex,
            },
        });

        revalidatePath(`/dashboard/trips/${tripId}`);
        return { success: "Stop added!" };
    } catch (error) {
        console.error(error);
        return { error: "Failed to add stop." };
    }
};
