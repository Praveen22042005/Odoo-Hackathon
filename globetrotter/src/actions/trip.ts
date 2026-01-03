"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { CreateTripSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const createTrip = async (values: z.infer<typeof CreateTripSchema>) => {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Unauthorized" };
    }

    const validatedFields = CreateTripSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { name, description, dates, coverImage } = validatedFields.data;

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) {
        return { error: "User not found!" };
    }

    try {
        await db.trip.create({
            data: {
                userId: user.id,
                name,
                description,
                startDate: dates.from,
                endDate: dates.to,
                coverImage,
            },
        });

        revalidatePath("/dashboard");
        return { success: "Trip created!" };
    } catch {
        return { error: "Failed to create trip." };
    }
};

export const getTripsForSelect = async () => {
    const session = await auth();
    if (!session?.user?.email) return [];

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) return [];

    return await db.trip.findMany({
        where: { userId: user.id },
        select: { id: true, name: true },
        orderBy: { startDate: 'desc' }
    });
};
