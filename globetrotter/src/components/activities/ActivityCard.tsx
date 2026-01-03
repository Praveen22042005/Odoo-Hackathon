"use client";

import { Activity } from "@/data/activities";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Plus } from "lucide-react";
import { AddToTripDialog } from "@/components/dashboard/AddToTripDialog";

interface ActivityCardProps {
    activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
    return (
        <Card className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 group">
            <div className="aspect-[4/3] relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={activity.image}
                    alt={activity.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                {/* Type Badge */}
                <div className="absolute top-3 left-3">
                    <Badge className="bg-blue-600/90 backdrop-blur-sm text-white border-0 capitalize">
                        {activity.type}
                    </Badge>
                </div>

                {/* Rating */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-zinc-950/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-white font-medium">{activity.rating}</span>
                </div>
            </div>

            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <CardTitle className="text-lg leading-tight">{activity.name}</CardTitle>
                        <div className="flex items-center gap-1 mt-1 text-xs text-zinc-400">
                            <MapPin className="h-3 w-3" />
                            <span>{activity.city}, {activity.country}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-emerald-400">${activity.price}</div>
                        <div className="text-xs text-zinc-500">{activity.priceCategory}</div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                <CardDescription className="text-sm text-zinc-400 line-clamp-2 mb-3">
                    {activity.description}
                </CardDescription>

                <AddToTripDialog
                    type="activity"
                    data={{
                        name: activity.name,
                        type: activity.type,
                        cost: activity.price
                    }}
                />
            </CardContent>
        </Card>
    );
}
