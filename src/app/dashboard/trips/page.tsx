import { auth } from "@/auth";
import { getTrips } from "@/data/trip";
import { TripCard } from "@/components/dashboard/TripCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";

export default async function MyTripsPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const trips = await getTrips();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Trips</h1>
                    <p className="text-zinc-400 mt-1">
                        Manage your upcoming adventures and past journeys.
                    </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                    <Link href="/dashboard/create">
                        <Plus className="mr-2 h-4 w-4" /> Plan New Trip
                    </Link>
                </Button>
            </div>

            {/* Search/Filter Bar */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search trips..."
                        className="pl-10 bg-zinc-900 border-zinc-800"
                    />
                </div>
                {/* Add filters later if needed */}
            </div>

            {trips.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 py-24 border border-zinc-800 border-dashed rounded-xl bg-zinc-900/30">
                    <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                        <Plus className="h-6 w-6 text-zinc-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">No trips found</h3>
                    <p className="text-zinc-400 mt-2 text-center max-w-sm mb-6">
                        You haven't created any trips yet. Start planning your first adventure!
                    </p>
                    <Button asChild>
                        <Link href="/dashboard/create">Create your first trip</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            id={trip.id}
                            name={trip.name}
                            startDate={trip.startDate}
                            endDate={trip.endDate}
                            stopCount={trip._count.stops}
                            coverImage={trip.coverImage}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
