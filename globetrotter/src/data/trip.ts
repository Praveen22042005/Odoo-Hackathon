"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getTripById = async (tripId: string) => {
    const session = await auth();

    if (!session?.user?.email) {
        return null;
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) return null;

    const trip = await db.trip.findUnique({
        where: {
            id: tripId,
            userId: user.id // Ensure ownership
        },
        include: {
            stops: {
                include: {
                    activities: true
                },
                orderBy: {
                    orderIndex: 'asc'
                }
            },
            budgetSettings: true
        }
    });

    return trip;
};

export const getTrips = async () => {
    const session = await auth();
    if (!session?.user?.email) return null;

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) return null;

    return await db.trip.findMany({
        where: { userId: user.id },
        orderBy: { startDate: 'asc' },
        include: {
            _count: {
                select: { stops: true }
            }
        }
    });
};
