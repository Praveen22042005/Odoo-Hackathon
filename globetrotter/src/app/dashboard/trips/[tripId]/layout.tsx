import { auth } from "@/auth";
import { getTripById } from "@/data/trip";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, DollarSign, Map, Settings } from "lucide-react";
import { format } from "date-fns";

export default async function TripLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { tripId: string };
}) {
    const session = await auth();
    if (!session) redirect("/login");

    const trip = await getTripById(params.tripId);
    if (!trip) redirect("/dashboard");

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Link href="/dashboard" className="hover:text-white transition-colors flex items-center">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Dashboard
                    </Link>
                    <span>/</span>
                    <span className="text-zinc-100">{trip.name}</span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{trip.name}</h1>
                        <div className="flex items-center gap-4 mt-2 text-zinc-400">
                            <div className="flex items-center text-sm">
                                <Calendar className="mr-2 h-4 w-4" />
                                {format(new Date(trip.startDate), "MMM d, yyyy")} - {format(new Date(trip.endDate), "MMM d, yyyy")}
                            </div>
                            {/* Add more meta info if needed */}
                        </div>
                    </div>

                    <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800 overflow-x-auto max-w-full">
                        <Button variant="ghost" size="sm" className="bg-zinc-800 text-white" asChild>
                            <Link href={`/dashboard/trips/${trip.id}`}>
                                <Map className="mr-2 h-4 w-4" /> Itinerary
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" asChild>
                            <Link href={`/dashboard/trips/${trip.id}/budget`}>
                                <DollarSign className="mr-2 h-4 w-4" /> Budget
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" asChild>
                            <Link href={`/dashboard/trips/${trip.id}/settings`}>
                                <Settings className="mr-2 h-4 w-4" /> Settings
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}
