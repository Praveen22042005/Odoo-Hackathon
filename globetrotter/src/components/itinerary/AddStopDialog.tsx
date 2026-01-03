"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { DateRange } from "react-day-picker";

import { AddStopSchema } from "@/schemas";
import { addStop } from "@/actions/stop"; // We created this
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface AddStopDialogProps {
    tripId: string;
}

export function AddStopDialog({ tripId }: AddStopDialogProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof AddStopSchema>>({
        resolver: zodResolver(AddStopSchema),
        defaultValues: {
            tripId,
            city: "",
            country: "",
        },
    });

    const onSubmit = (values: z.infer<typeof AddStopSchema>) => {
        startTransition(() => {
            addStop(values)
                .then((data) => {
                    if (data.success) {
                        setOpen(false);
                        form.reset();
                    }
                    // Handle error
                });
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Stop
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-900 border-zinc-800 text-zinc-100">
                <DialogHeader>
                    <DialogTitle>Add a Stop</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Add a city to your itinerary.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Paris" className="bg-zinc-800 border-zinc-700" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="France" className="bg-zinc-800 border-zinc-700" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dates"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Dates</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal bg-zinc-800 border-zinc-700 hover:bg-zinc-700 hover:text-white",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.from ? (
                                                        field.value.to ? (
                                                            <>
                                                                {format(field.value.from, "MMM dd")} -{" "}
                                                                {format(field.value.to, "MMM dd")}
                                                            </>
                                                        ) : (
                                                            format(field.value.from, "MMM dd")
                                                        )
                                                    ) : (
                                                        <span>Pick a date range</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="range"
                                                selected={field.value as DateRange}
                                                onSelect={(value) => {
                                                    if (value?.from && value?.to) {
                                                        field.onChange({ from: value.from, to: value.to });
                                                    } else if (value?.from) {
                                                        field.onChange({ from: value.from, to: value.from });
                                                    }
                                                }}
                                                disabled={(date) =>
                                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700">
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Add Stop
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
