"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, X } from "lucide-react";

interface ActivityFiltersProps {
    selectedTypes: string[];
    selectedPriceCategory: string;
    selectedCity: string;
    onTypeChange: (types: string[]) => void;
    onPriceCategoryChange: (category: string) => void;
    onCityChange: (city: string) => void;
    onClearFilters: () => void;
    cities: string[];
}

const ACTIVITY_TYPES = [
    { value: "sightseeing", label: "Sightseeing" },
    { value: "food", label: "Food & Dining" },
    { value: "adventure", label: "Adventure" },
    { value: "relax", label: "Relaxation" },
    { value: "transport", label: "Transport" },
    { value: "accommodation", label: "Accommodation" },
    { value: "other", label: "Other" },
];

const PRICE_CATEGORIES = [
    { value: "all", label: "All Prices" },
    { value: "$", label: "Budget ($)" },
    { value: "$$", label: "Mid-range ($$)" },
    { value: "$$$", label: "Luxury ($$$)" },
];

export function ActivityFilters({
    selectedTypes,
    selectedPriceCategory,
    selectedCity,
    onTypeChange,
    onPriceCategoryChange,
    onCityChange,
    onClearFilters,
    cities,
}: ActivityFiltersProps) {
    const handleTypeToggle = (type: string) => {
        if (selectedTypes.includes(type)) {
            onTypeChange(selectedTypes.filter(t => t !== type));
        } else {
            onTypeChange([...selectedTypes, type]);
        }
    };

    const hasActiveFilters = selectedTypes.length > 0 || selectedPriceCategory !== "all" || selectedCity !== "all";

    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-blue-400" />
                        <CardTitle className="text-lg">Filters</CardTitle>
                    </div>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="text-xs text-zinc-400 hover:text-white"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Clear All
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Activity Type */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-zinc-300">Activity Type</Label>
                    <div className="space-y-2">
                        {ACTIVITY_TYPES.map((type) => (
                            <div key={type.value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={type.value}
                                    checked={selectedTypes.includes(type.value)}
                                    onCheckedChange={() => handleTypeToggle(type.value)}
                                    className="border-zinc-700 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                                />
                                <Label
                                    htmlFor={type.value}
                                    className="text-sm text-zinc-400 cursor-pointer hover:text-white transition-colors"
                                >
                                    {type.label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Category */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-zinc-300">Price Range</Label>
                    <Select value={selectedPriceCategory} onValueChange={onPriceCategoryChange}>
                        <SelectTrigger className="bg-zinc-950 border-zinc-800">
                            <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                            {PRICE_CATEGORIES.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* City */}
                <div className="space-y-3">
                    <Label className="text-sm font-medium text-zinc-300">City</Label>
                    <Select value={selectedCity} onValueChange={onCityChange}>
                        <SelectTrigger className="bg-zinc-950 border-zinc-800">
                            <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                            <SelectItem value="all">All Cities</SelectItem>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    );
}
