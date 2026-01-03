import React from "react";
import Link from "next/link";
import { UserNav } from "@/components/dashboard/UserNav"; // We will create this
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/dashboard" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-600 bg-clip-text text-transparent">
                        GlobeTrotter
                    </Link>

                    <div className="flex items-center gap-4">
                        <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-400 mr-4">
                            <Link href="/dashboard" className="hover:text-white transition-colors">Overview</Link>
                            <Link href="/dashboard/trips" className="hover:text-white transition-colors">My Trips</Link>
                            <Link href="/dashboard/explore" className="hover:text-white transition-colors">Explore</Link>
                        </nav>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                            <Link href="/dashboard/create">
                                + New Trip
                            </Link>
                        </Button>
                        <UserNav />
                    </div>
                </div>
            </header >
            <main className="container mx-auto px-4 py-8">
                {children}
            </main>
        </div >
    );
}
