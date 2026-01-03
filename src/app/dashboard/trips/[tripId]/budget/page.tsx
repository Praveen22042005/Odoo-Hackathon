import { getTripById } from "@/data/trip";
import { updateBudget } from "@/actions/budget";
import { BudgetCharts } from "@/components/dashboard/BudgetCharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, PieChart, TrendingUp } from "lucide-react";
import { redirect } from "next/navigation";

export default async function BudgetPage({ params }: { params: { tripId: string } }) {
    const trip = await getTripById(params.tripId);
    if (!trip) redirect("/dashboard");

    const totalCost = trip.stops.reduce((acc, stop) =>
        acc + stop.activities.reduce((sum, act) => sum + (act.cost || 0), 0)
        , 0);

    const budget = trip.budgetSettings?.totalBudget || 0;
    const currency = trip.budgetSettings?.currency || "USD";
    const percentage = budget > 0 ? (totalCost / budget) * 100 : 0;
    const isOverBudget = totalCost > budget && budget > 0;

    async function setBudget(formData: FormData) {
        "use server";
        const amount = Number(formData.get("amount"));
        await updateBudget({ tripId: params.tripId, amount });
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Trip Budget</h2>
                <p className="text-zinc-400">Manage your expenses and stay on track.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Estimated Cost</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${totalCost.toFixed(2)}</div>
                        <p className="text-xs text-zinc-500 mt-1">
                            Based on planned activities
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Budget Limit</CardTitle>
                        <PieChart className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">${budget.toFixed(2)}</div>
                        <form action={setBudget} className="flex items-center gap-2 mt-2">
                            <Input name="amount" type="number" placeholder="Set Budget" className="h-8 text-xs bg-zinc-950 border-zinc-800" />
                            <Button size="sm" variant="outline" className="h-8 text-xs">Update</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Status</CardTitle>
                        <TrendingUp className={`h-4 w-4 ${isOverBudget ? "text-red-500" : "text-emerald-500"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {percentage.toFixed(1)}% Used
                        </div>
                        <Progress value={Math.min(percentage, 100)} className={`mt-2 h-2 ${isOverBudget ? "bg-red-900" : "bg-zinc-800"}`} indicatorClassName={isOverBudget ? "bg-red-500" : "bg-blue-500"} />
                    </CardContent>
                </Card>
            </div>

            {/* Expense Visualizations */}
            <BudgetCharts
                activities={trip.stops.flatMap(s => s.activities).map(a => ({
                    id: a.id,
                    type: a.type,
                    cost: a.cost
                }))}
            />

            {/* Breakdown List */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle>Expense Breakdown</CardTitle>
                    <CardDescription>Where your money is going.</CardDescription>
                </CardHeader>
                <CardContent>
                    {totalCost === 0 ? (
                        <div className="text-center py-8 text-zinc-500">
                            No expenses recorded yet. Add activities with costs to see the breakdown.
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {trip.stops.map(stop => {
                                const stopCost = stop.activities.reduce((s, a) => s + (a.cost || 0), 0);
                                if (stopCost === 0) return null;
                                return (
                                    <div key={stop.id} className="flex items-center justify-between text-sm border-b border-zinc-800 pb-2 last:border-0">
                                        <span className="text-zinc-300 font-medium">{stop.city}</span>
                                        <span className="font-mono text-zinc-400">${stopCost.toFixed(2)}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
