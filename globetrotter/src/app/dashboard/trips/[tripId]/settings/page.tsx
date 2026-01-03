import { getTripById } from "@/data/trip";
import { toggleTripVisibility } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Share2, Copy } from "lucide-react";
import { redirect } from "next/navigation";

export default async function TripSettingsPage({ params }: { params: { tripId: string } }) {
    const trip = await getTripById(params.tripId);
    if (!trip) redirect("/dashboard");

    async function onVisibilityChange(formData: FormData) {
        "use server";
        const isPublic = formData.get("isPublic") === "on";
        await toggleTripVisibility(params.tripId, isPublic);
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/share/${trip.id}`;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Trip Settings</h2>
                <p className="text-zinc-400">Manage visibility and share your trip.</p>
            </div>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle>Visibility</CardTitle>
                    <CardDescription>
                        Control who can see your trip.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label className="text-base">Public Access</Label>
                            <p className="text-sm text-zinc-400">
                                Allow anyone with the link to view this itinerary.
                            </p>
                        </div>
                        <form action={onVisibilityChange}>
                            <Switch
                                name="isPublic"
                                defaultChecked={trip.isPublic}
                                type="submit"
                            // Quick form submit on change hack not standard, usually requires client component
                            // We will use a wrapper or assume Button submit for server action
                            />
                            <Button type="submit" variant="ghost" size="sm" className="hidden">Save</Button>
                        </form>
                    </div>

                    {trip.isPublic && (
                        <div className="flex flex-col space-y-2">
                            <Label>Share Link</Label>
                            <div className="flex space-x-2">
                                <Input value={shareUrl} readOnly className="bg-zinc-950 border-zinc-800 text-zinc-400" />
                                <Button variant="outline" size="icon" className="shrink-0 bg-zinc-900 border-zinc-800">
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-red-900/10 border-red-900/20">
                <CardHeader>
                    <CardTitle className="text-red-500">Danger Zone</CardTitle>
                    <CardDescription>
                        Irreversible actions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Delete Trip</Button>
                </CardContent>
            </Card>
        </div>
    );
}
