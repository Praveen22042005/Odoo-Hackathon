"use client";

import { useState, useMemo } from "react";
import { ACTIVITIES, getUniqueCities } from "@/data/activities";
import { ActivityCard } from "@/components/activities/ActivityCard";
import { ActivityFilters } from "@/components/activities/ActivityFilters";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function ActivitiesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedPriceCategory, setSelectedPriceCategory] = useState("all");
    const [selectedCity, setSelectedCity] = useState("all");

    const cities = useMemo(() => getUniqueCities(), []);

    const filteredActivities = useMemo(() => {
        return ACTIVITIES.filter((activity) => {
            // Search filter
            const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.city.toLowerCase().includes(searchQuery.toLowerCase());

            // Type filter
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(activity.type);

            // Price category filter
            const matchesPrice = selectedPriceCategory === "all" || activity.priceCategory === selectedPriceCategory;

            // City filter
            const matchesCity = selectedCity === "all" || activity.city === selectedCity;

            return matchesSearch && matchesType && matchesPrice && matchesCity;
        });
    }, [searchQuery, selectedTypes, selectedPriceCategory, selectedCity]);

    const handleClearFilters = () => {
        setSelectedTypes([]);
        setSelectedPriceCategory("all");
        setSelectedCity("all");
        setSearchQuery("");
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Discover Activities
                </h1>
                <p className="text-zinc-400 max-w-2xl mx-auto">
                    Find the perfect experiences for your trip. From sightseeing to adventure, we've got you covered.
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Search activities, cities, or experiences..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-zinc-900/50 border-zinc-800 h-10 focus:ring-blue-500/20"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        <ActivityFilters
                            selectedTypes={selectedTypes}
                            selectedPriceCategory={selectedPriceCategory}
                            selectedCity={selectedCity}
                            onTypeChange={setSelectedTypes}
                            onPriceCategoryChange={setSelectedPriceCategory}
                            onCityChange={setSelectedCity}
                            onClearFilters={handleClearFilters}
                            cities={cities}
                        />
                    </div>
                </div>

                {/* Activities Grid */}
                <div className="lg:col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm text-zinc-400">
                            {filteredActivities.length} {filteredActivities.length === 1 ? 'activity' : 'activities'} found
                        </p>
                    </div>

                    {filteredActivities.length === 0 ? (
                        <div className="flex flex-col items-center justify-center p-12 border border-zinc-800 border-dashed rounded-xl bg-zinc-900/30">
                            <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                                <Search className="h-6 w-6 text-zinc-400" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1">No activities found</h3>
                            <p className="text-sm text-zinc-400 text-center max-w-sm mb-4">
                                Try adjusting your filters or search query to find more activities.
                            </p>
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredActivities.map((activity) => (
                                <ActivityCard key={activity.id} activity={activity} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
