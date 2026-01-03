"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TripCardProps {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    stopCount: number;
    coverImage?: string | null;
}

export function TripCard({ id, name, startDate, endDate, stopCount, coverImage }: TripCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            layout
        >
            <Card className="overflow-hidden border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-colors group">
                <div className="aspect-video w-full bg-zinc-800 relative">
                    {/* Placeholder for image or gradient if no image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-teal-500/20" />
                    {coverImage && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={coverImage} alt={name} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" />
                    )}
                </div>
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-zinc-100 line-clamp-1">{name}</h3>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-400 hover:text-white">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/trips/${id}`}>View Itinerary</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Rename</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-2">
                    <div className="flex items-center text-sm text-zinc-400">
                        <Calendar className="mr-2 h-4 w-4 text-zinc-500" />
                        <span>
                            {format(new Date(startDate), "MMM d")} - {format(new Date(endDate), "MMM d, yyyy")}
                        </span>
                    </div>
                    <div className="flex items-center text-sm text-zinc-400">
                        <MapPin className="mr-2 h-4 w-4 text-zinc-500" />
                        <span>{stopCount} {stopCount === 1 ? 'Stop' : 'Stops'}</span>
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-2">
                    <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700" asChild>
                        <Link href={`/dashboard/trips/${id}`}>Manage Trip</Link>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
