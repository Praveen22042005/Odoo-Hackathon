import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToTripDialog } from "@/components/dashboard/AddToTripDialog";

const POPULAR_CITIES = [
    { id: "paris", name: "Paris", country: "France", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", rating: 4.8 },
    { id: "tokyo", name: "Tokyo", country: "Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800", rating: 4.9 },
    { id: "nyc", name: "New York", country: "USA", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800", rating: 4.7 },
    { id: "rome", name: "Rome", country: "Italy", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800", rating: 4.6 },
];

const POPULAR_ACTIVITIES = [
    { id: "1", name: "Eiffel Tower Tour", type: "Sightseeing", cost: "$50", city: "Paris", image: "https://images.unsplash.com/photo-1511739001486-91da411a33a1?auto=format&fit=crop&q=80&w=800" },
    { id: "2", name: "Sushi Making Class", type: "Food", cost: "$80", city: "Tokyo", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800" },
    { id: "3", name: "Colosseum Entry", type: "Sightseeing", cost: "$35", city: "Rome", image: "https://images.unsplash.com/photo-1552483775-6b83f47e383c?auto=format&fit=crop&q=80&w=800" },
];

export default function ExplorePage() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                    Explore the World
                </h1>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Discover your next destination. Browse popular cities and trending activities.
                </p>

                <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search cities, countries, or activities..."
                        className="pl-10 bg-zinc-900/50 border-zinc-800 h-10"
                    />
                </div>
            </div>

            <Tabs defaultValue="cities" className="space-y-6">
                <div className="flex justify-center">
                    <TabsList className="bg-zinc-900 border border-zinc-800">
                        <TabsTrigger value="cities">Popular Cities</TabsTrigger>
                        <TabsTrigger value="activities">Trending Activities</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="cities" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {POPULAR_CITIES.map((city) => (
                            <Card key={city.id} className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors group cursor-pointer">
                                <div className="aspect-[4/3] relative overflow-hidden">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={city.image}
                                        alt={city.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h3 className="font-bold text-lg text-white mb-1">{city.name}</h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-zinc-300">{city.country}</p>
                                            <div className="w-24">
                                                <AddToTripDialog type="city" data={city} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="activities" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {POPULAR_ACTIVITIES.map((act) => (
                            <Card key={act.id} className="bg-zinc-900 border-zinc-800 hover:bg-zinc-900/80 transition-colors">
                                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={act.image} alt={act.name} className="object-cover w-full h-full" />
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-base">{act.name}</CardTitle>
                                            <CardDescription>{act.city}</CardDescription>
                                        </div>
                                        <div className="bg-zinc-950 px-2 py-1 rounded text-xs font-mono text-emerald-400 border border-zinc-800">
                                            {act.cost}
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
