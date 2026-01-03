"use client";

import { useEffect, useState, useTransition } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getTripsForSelect } from "@/actions/trip";
import { addStop } from "@/actions/stop";

interface AddToTripDialogProps {
    type: "city" | "activity";
    data: {
        name: string;
        country?: string;
        cost?: number | string;
        type?: string;
        image?: string;
    };
}

export function AddToTripDialog({ type, data }: AddToTripDialogProps) {
    const [open, setOpen] = useState(false);
    const [trips, setTrips] = useState<{ id: string; name: string }[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (open) {
            setLoading(true);
            getTripsForSelect()
                .then(setTrips)
                .finally(() => setLoading(false));
        }
    }, [open]);

    const handleAdd = () => {
        if (!selectedTrip) return;

        startTransition(async () => {
            if (type === "city") {
                const res = await addStop({
                    tripId: selectedTrip,
                    city: data.name,
                    country: data.country || "",
                    dates: { from: new Date(), to: new Date() } // Defaults
                });

                if (res.error) {
                    alert(res.error); // Simple alert for now
                } else {
                    setOpen(false);
                }
            } else {
                alert("Adding activities directly to trips is not yet supported. Please add the city first!");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add to Trip
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Add to Trip</DialogTitle>
                    <DialogDescription>
                        Save <strong>{data.name}</strong> to one of your planned trips.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-400">Select Trip</label>
                        <Select onValueChange={setSelectedTrip} value={selectedTrip}>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800">
                                <SelectValue placeholder={loading ? "Loading trips..." : "Choose a trip"} />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                                {trips.length === 0 && !loading ? (
                                    <div className="p-2 text-sm text-zinc-500 text-center">No trips found</div>
                                ) : (
                                    trips.map(trip => (
                                        <SelectItem key={trip.id} value={trip.id}>{trip.name}</SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd} disabled={!selectedTrip || isPending} className="bg-blue-600 hover:bg-blue-700">
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add {type === 'city' ? 'City' : 'Item'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
