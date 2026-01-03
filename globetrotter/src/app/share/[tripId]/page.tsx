import { db } from "@/lib/db";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function getPublicTrip(tripId: string) {
    const trip = await db.trip.findUnique({
        where: { id: tripId },
        include: {
            stops: {
                include: { activities: true },
                orderBy: { orderIndex: 'asc' }
            },
            user: {
                select: { name: true, image: true }
            }
        }
    });

    if (trip && !trip.isPublic) return null;
    return trip;
}

export default async function PublicSharePage({ params }: { params: { tripId: string } }) {
    const trip = await getPublicTrip(params.tripId);

    if (!trip) {
        return (
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-2">Trip Not Found</h1>
                <p className="text-zinc-400 mb-8">This trip is private or does not exist.</p>
                <Button asChild>
                    <Link href="/">Go Home</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-600 bg-clip-text text-transparent">
                        GlobeTrotter
                    </Link>
                    <div className="text-sm text-zinc-400">
                        Planned by <span className="text-white font-medium">{trip.user.name}</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold mb-4">{trip.name}</h1>
                    <div className="flex items-center justify-center gap-4 text-zinc-400">
                        <span className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> {format(new Date(trip.startDate), "MMM d, yyyy")} - {format(new Date(trip.endDate), "MMM d, yyyy")}</span>
                        <span>•</span>
                        <span>{trip.stops.length} Cities</span>
                    </div>
                    {trip.description && <p className="mt-4 text-lg text-zinc-300 max-w-2xl mx-auto">{trip.description}</p>}
                </div>

                <div className="space-y-8 relative pl-6 border-l border-zinc-800 ml-4 md:ml-0">
                    {trip.stops.map((stop) => (
                        <div key={stop.id} className="relative">
                            <div className="absolute -left-[29px] top-6 h-4 w-4 rounded-full bg-blue-600 border-4 border-zinc-950 shadow-sm" />
                            <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-2xl font-bold">{stop.city}</CardTitle>
                                        <div className="text-sm text-zinc-400 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800">
                                            {format(new Date(stop.arrivalDate), "MMM d")} - {format(new Date(stop.departureDate), "MMM d")}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {stop.activities.length > 0 ? (
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {stop.activities.map(act => (
                                                <div key={act.id} className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex items-center gap-3">
                                                    <div className="h-2 w-2 rounded-full bg-teal-500" />
                                                    <div>
                                                        <div className="font-medium text-zinc-200">{act.name}</div>
                                                        <div className="text-xs text-zinc-500 capitalize">{act.type}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-zinc-500 italic text-sm">No activities listed.</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-zinc-500 mb-4">Inspired by this trip?</p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                        <Link href="/signup">Start Planning Your Own</Link>
                    </Button>
                </div>
            </main>
        </div>
    );
}
