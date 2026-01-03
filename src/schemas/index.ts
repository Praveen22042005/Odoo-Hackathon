import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
    password: z.string().min(1, {
        message: "Password is required",
    }),
});

export const RegisterSchema = z.object({
    firstName: z.string().min(1, {
        message: "First name is required",
    }),
    lastName: z.string().min(1, {
        message: "Last name is required",
    }),
    email: z.string().email({
        message: "Email is required",
    }),
    city: z.string().optional(),
    country: z.string().optional(),
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
    }),
});

export const CreateTripSchema = z.object({
    name: z.string().min(1, {
        message: "Trip name is required",
    }),
    description: z.string().optional(),
    dates: z.object({
        from: z.date(),
        to: z.date(),
    }),
    coverImage: z.string().optional(),
});

export const AddStopSchema = z.object({
    tripId: z.string(),
    city: z.string().min(1, { message: "City name is required" }),
    country: z.string().optional(),
    dates: z.object({
        from: z.date(),
        to: z.date(),
    }),
});

export const AddActivitySchema = z.object({
    stopId: z.string(),
    name: z.string().min(1, { message: "Activity name is required" }),
    type: z.enum(["sightseeing", "food", "adventure", "relax", "transport", "accommodation", "other"]),
    cost: z.coerce.number().min(0, { message: "Cost must be a positive number" }).default(0),
    date: z.date(),
    time: z.string().optional(),
});

export const SettingsSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    // email: z.string().email().optional(), // If we want to allow email updates later
    // password: z.string().min(6).optional(), // If we want to allow password updates
    // For now just name as per simple requirement
});
