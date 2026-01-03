import { getTripById } from "@/data/trip";
import { AddStopDialog } from "@/components/itinerary/AddStopDialog";
import { AddActivityDialog } from "@/components/itinerary/AddActivityDialog";
import { CalendarView } from "@/components/itinerary/CalendarView";
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function TripItineraryPage({ params }: { params: { tripId: string } }) {
    const trip = await getTripById(params.tripId);
    if (!trip) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Itinerary Timeline */}
            <div className="lg:col-span-2 space-y-6">
                <Tabs defaultValue="list" className="space-y-6">
                    <div className="flex items-center justify-between">
                        <TabsList className="bg-zinc-900 border border-zinc-800">
                            <TabsTrigger value="list" className="data-[state=active]:bg-zinc-800">List View</TabsTrigger>
                            <TabsTrigger value="calendar" className="data-[state=active]:bg-zinc-800">Calendar View</TabsTrigger>
                        </TabsList>
                        <AddStopDialog tripId={trip.id} />
                    </div>

                    <TabsContent value="list">
                        {trip.stops.length === 0 ? (
                            <div className="p-12 border border-zinc-800 border-dashed rounded-xl flex flex-col items-center justify-center text-zinc-400 text-center bg-zinc-900/30">
                                <div className="bg-zinc-800 p-4 rounded-full mb-4">
                                    <MapPin className="h-8 w-8 text-zinc-400" />
                                </div>
                                <p className="font-medium text-white mb-1">Your itinerary is empty.</p>
                                <p className="text-sm">Start adding stops (cities) to build your plan.</p>
                            </div>
                        ) : (
                            <div className="space-y-6 relative ml-4 pl-4 border-l border-zinc-800">
                                {trip.stops.map((stop, index) => (
                                    <div key={stop.id} className="relative">
                                        <div className="absolute -left-[25px] top-4 h-4 w-4 rounded-full bg-blue-600 border-4 border-zinc-950 shadow-sm" />
                                        <Card className="bg-zinc-900 border-zinc-800 text-zinc-100">
                                            <CardHeader className="pb-2">
                                                <div className="flex justify-between items-start">
                                                    <CardTitle className="text-lg font-bold flex items-center">
                                                        {stop.city}
                                                        {stop.country && <span className="text-sm font-normal text-zinc-400 ml-2">({stop.country})</span>}
                                                    </CardTitle>
                                                    <AddActivityDialog stopId={stop.id} defaultDate={stop.arrivalDate} />
                                                </div>
                                                <div className="text-sm text-zinc-400 flex items-center">
                                                    <Calendar className="mr-2 h-3.5 w-3.5" />
                                                    {format(new Date(stop.arrivalDate), "MMM d")} - {format(new Date(stop.departureDate), "MMM d")}
                                                </div>
                                            </CardHeader>
                                            <CardContent className="space-y-3 pt-2">
                                                {/* Activities List */}
                                                {stop.activities.length === 0 ? (
                                                    <p className="text-xs text-zinc-500 italic">No activities planned yet.</p>
                                                ) : (
                                                    <div className="grid gap-2">
                                                        {stop.activities.map((activity) => (
                                                            <div key={activity.id} className="bg-zinc-950/50 p-3 rounded-lg flex items-center justify-between border border-zinc-800/50">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs text-center">
                                                                        {activity.time ? activity.time : <Clock className="h-3 w-3" />}
                                                                    </div>
                                                                    <div>
                                                                        <div className="flex items-center gap-2">
                                                                            <p className="text-sm font-medium leading-none">{activity.name}</p>
                                                                            {activity.type && (
                                                                                <span className="text-[10px] uppercase tracking-wider bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-sm">{activity.type}</span>
                                                                            )}
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center gap-4 text-sm text-zinc-400">
                                                                    {activity.cost > 0 && (
                                                                        <span className="flex items-center text-emerald-400">
                                                                            <DollarSign className="h-3 w-3 mr-0.5" /> {activity.cost}
                                                                        </span>
                                                                    )}
                                                                    {/* Actions could go here */}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="calendar">
                        <CalendarView
                            tripStartDate={trip.startDate}
                            tripEndDate={trip.endDate}
                            stops={trip.stops}
                        />
                    </TabsContent>
                </Tabs>

            </div>

            {/* Sidebar (Notes, Summary, Cost) */}
            <div className="space-y-6">
                <div className="border border-zinc-800 bg-zinc-900/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-4 text-white">Trip Summary</h3>
                    {trip.description && <p className="text-sm text-zinc-400 mb-4">{trip.description}</p>}

                    <div className="space-y-4 pt-4 border-t border-zinc-800">
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Cities</span>
                            <span className="text-white">{trip.stops.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-zinc-400">Estimated Cost</span>
                            <span className="text-emerald-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                $ {trip.stops.reduce((acc, stop) => acc + stop.activities.reduce((sum, act) => sum + (act.cost || 0), 0), 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
