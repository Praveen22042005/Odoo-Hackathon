"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const BudgetSchema = z.object({
    tripId: z.string(),
    amount: z.coerce.number().min(0),
    currency: z.string().default("USD"),
});

export const updateBudget = async (values: z.infer<typeof BudgetSchema>) => {
    const session = await auth();

    if (!session?.user?.email) {
        return { error: "Unauthorized" };
    }

    const { tripId, amount, currency } = values;

    const trip = await db.trip.findUnique({
        where: { id: tripId },
    });

    if (!trip || trip.userId !== (await db.user.findUnique({ where: { email: session.user.email } }))?.id) {
        return { error: "Unauthorized" };
    }

    try {
        await db.budgetSettings.upsert({
            where: { tripId },
            update: { totalBudget: amount, currency },
            create: { tripId, totalBudget: amount, currency },
        });

        revalidatePath(`/dashboard/trips/${tripId}/budget`);
        return { success: "Budget updated!" };
    } catch {
        return { error: "Failed to update budget." };
    }
};
