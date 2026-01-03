"use client";

import { useMemo, useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, startOfDay, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CalendarViewProps {
    tripStartDate: Date;
    tripEndDate: Date;
    stops: {
        id: string;
        city: string;
        arrivalDate: Date;
        departureDate: Date;
        activities: {
            id: string;
            name: string;
            date: Date;
            time: string | null;
            type: string | null;
        }[];
    }[];
}

export function CalendarView({ tripStartDate, tripEndDate, stops }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date(tripStartDate)));

    const days = useMemo(() => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        return eachDayOfInterval({ start, end });
    }, [currentMonth]);

    const nextMonth = () => setCurrentMonth(prev => addMonths(prev, 1));
    const prevMonth = () => setCurrentMonth(prev => subMonths(prev, 1));

    const getActivitiesForDay = (day: Date) => {
        return stops.flatMap(stop =>
            stop.activities.filter(act => isSameDay(new Date(act.date), day))
                .map(act => ({ ...act, city: stop.city }))
        );
    };

    const getStopForDay = (day: Date) => {
        return stops.find(stop =>
            isWithinInterval(day, {
                start: startOfDay(new Date(stop.arrivalDate)),
                end: startOfDay(new Date(stop.departureDate))
            })
        );
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-zinc-800">
                <h2 className="text-lg font-bold text-white">
                    {format(currentMonth, "MMMM yyyy")}
                </h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={prevMonth} className="h-8 w-8 bg-zinc-800 border-zinc-700">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextMonth} className="h-8 w-8 bg-zinc-800 border-zinc-700">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 border-b border-zinc-800 bg-zinc-950/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                    <div key={day} className="p-2 text-center text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 auto-rows-fr h-[600px]">
                {/* Empty cells for start of month offsets would go here, simplified for now */}
                {Array.from({ length: days[0].getDay() }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-zinc-950/30 border-r border-b border-zinc-800/50" />
                ))}

                {days.map(day => {
                    const activities = getActivitiesForDay(day);
                    const stop = getStopForDay(day);
                    const isTripDay = isWithinInterval(day, { start: startOfDay(new Date(tripStartDate)), end: startOfDay(new Date(tripEndDate)) });

                    return (
                        <div
                            key={day.toISOString()}
                            className={cn(
                                "min-h-[100px] p-2 border-r border-b border-zinc-800/50 flex flex-col gap-1 transition-colors hover:bg-zinc-800/20",
                                !isTripDay && "opacity-30 bg-zinc-950",
                                isSameDay(day, new Date()) && "bg-blue-900/10"
                            )}
                        >
                            <div className="flex justify-between items-start">
                                <span className={cn(
                                    "text-sm font-medium h-6 w-6 flex items-center justify-center rounded-full",
                                    isSameDay(day, new Date()) ? "bg-blue-600 text-white" : "text-zinc-400"
                                )}>
                                    {format(day, "d")}
                                </span>
                                {stop && isSameDay(day, new Date(stop.arrivalDate)) && (
                                    <Badge variant="outline" className="text-[10px] h-4 px-1 border-blue-800 text-blue-400 bg-blue-900/20 truncate max-w-[80px]">
                                        Arrive {stop.city}
                                    </Badge>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col gap-1 overflow-y-auto mt-1 custom-scrollbar">
                                {activities.map((act) => (
                                    <Popover key={act.id}>
                                        <PopoverTrigger asChild>
                                            <button className="text-left bg-zinc-800/80 hover:bg-zinc-700 rounded px-1.5 py-1 text-[10px] truncate w-full border border-zinc-700/50 text-zinc-200">
                                                <span className="opacity-70 mr-1">{act.time || "•"}</span>
                                                {act.name}
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-64 p-3 bg-zinc-900 border-zinc-800" align="start">
                                            <h4 className="font-semibold text-sm mb-1">{act.name}</h4>
                                            <div className="text-xs text-zinc-400 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-3 w-3" /> {act.city}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-3 w-3" /> {act.time || "No time set"}
                                                </div>
                                                <div className="capitalize bg-zinc-800 w-fit px-1.5 py-0.5 rounded text-[10px] mt-2">
                                                    {act.type}
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
