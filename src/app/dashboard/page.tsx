import { auth } from "@/auth";
import { getTrips } from "@/data/trip";
import { TripCard } from "@/components/dashboard/TripCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, SortAsc } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const trips = await getTrips();
    const userName = session.user.name?.split(" ")[0] || "Traveler";

    // Static data for "Top Regional Selections" (Screen 3)
    const regionalSelections = [
        { id: "1", name: "Europe Summer", image: "https://images.unsplash.com/photo-1471341971474-27c5b81a96fc?auto=format&fit=crop&q=80&w=800" },
        { id: "2", name: "Asian Adventure", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800" },
        { id: "3", name: "Islands", image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c78?auto=format&fit=crop&q=80&w=800" },
        { id: "4", name: "Ski Trips", image: "https://images.unsplash.com/photo-1483519393321-c529fac1969a?auto=format&fit=crop&q=80&w=800" },
        { id: "5", name: "Deserts", image: "https://images.unsplash.com/photo-1466023363364-f6558455bc54?auto=format&fit=crop&q=80&w=800" },
    ];

    return (
        <div className="relative min-h-[calc(100vh-4rem)] space-y-8 pb-20">
            {/* 1. Banner Image */}
            <div className="relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000"
                    alt="Dashboard Banner"
                    className="object-cover w-full h-full brightness-75 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 md:left-10 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight drop-shadow-lg">
                        Welcome, {userName}.
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-200 drop-shadow-md mt-2 opacity-90">
                        Where will you go next?
                    </p>
                </div>
            </div>

            {/* 2. Controls: Search, Filter, Sort */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-4 z-10 bg-zinc-950/80 backdrop-blur-md p-4 rounded-xl border border-white/5 shadow-sm">
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search your trips..."
                        className="pl-10 bg-zinc-900 border-zinc-800 focus:ring-blue-500/20"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" className="flex-1 md:flex-none border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300">
                        <Filter className="mr-2 h-4 w-4" /> Group by
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button variant="outline" className="flex-1 md:flex-none border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-300">
                        <SortAsc className="mr-2 h-4 w-4" /> Sort by
                    </Button>
                </div>
            </div>

            {/* 3. Top Regional Selections (Horizontal Scroll) */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-white/90">Top Regional Selections</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                    {regionalSelections.map((item) => (
                        <Card key={item.id} className="min-w-[160px] md:min-w-[200px] h-[120px] md:h-[150px] overflow-hidden border-zinc-800 bg-zinc-900 relative group cursor-pointer snap-start">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                                <h3 className="text-white font-bold text-center drop-shadow-md px-2">{item.name}</h3>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* 4. Previous Trips (Grid) */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight text-white/90">Your Trips</h2>
                {trips.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 border border-zinc-800 border-dashed rounded-xl bg-zinc-900/30">
                        <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                            <Plus className="h-6 w-6 text-zinc-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white">No trips yet</h3>
                        <p className="text-zinc-400 mt-2 text-center max-w-sm mb-6">
                            Start by creating your first itinerary.
                        </p>
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

            {/* 5. Floating Action Button (FAB) */}
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    size="lg"
                    className="rounded-full h-14 w-auto px-6 bg-white text-black hover:bg-zinc-200 shadow-xl border border-white/10 transition-transform hover:scale-105"
                    asChild
                >
                    <Link href="/dashboard/create">
                        <Plus className="mr-2 h-5 w-5" /> Plan a Trip
                    </Link>
                </Button>
            </div>
        </div>
    );
}
