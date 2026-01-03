"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, LayoutDashboard, Lightbulb } from "lucide-react";

export default function LandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-purple-500/30">
      {/* Navbar Placeholder */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-teal-600 bg-clip-text text-transparent">
            GlobeTrotter
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Destinations</a>
            <a href="#" className="hover:text-white transition-colors">Plan Trip</a>
            <a href="#" className="hover:text-white transition-colors">Community</a>
            <a href="#" className="hover:text-white transition-colors">About</a>
          </div>
          <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10" asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-blue-300 backdrop-blur-sm">
              ✈️ Empowering Personalized Travel Planning
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tight">
              Dream, Design, and <br />
              <span className="bg-gradient-to-r from-blue-400 via-teal-500 to-green-500 bg-clip-text text-transparent">
                Experience the World
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              GlobeTrotter is your intelligent, collaborative platform to organize multi-city trips,
              manage budgets, and share your journey with the world.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="bg-white text-zinc-950 hover:bg-zinc-200 text-lg px-8 h-12 rounded-full" asChild>
                <a href="/dashboard">Plan New Trip</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 text-lg px-8 h-12 rounded-full">
                View Guidelines
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why GlobeTrotter?</h2>
            <p className="text-zinc-400">Everything you need to make your next adventure unforgettable</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<LayoutDashboard className="w-8 h-8 text-blue-400" />}
              title="Itinerary Builder"
              description="Construct detailed day-wise plans with drag-and-drop ease. Manage stops, durations, and activities."
              delay={0}
            />
            <FeatureCard
              icon={<Code className="w-8 h-8 text-teal-400" />} // Using Code icon as placeholder for Cost/Budget if no dollar sign imported
              title="Budget Tracking"
              description="Estimate costs automatically. Visualize spend breakdowns by transport, stay, and activities."
              delay={0.1}
            />
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8 text-yellow-400" />}
              title="Discover Places"
              description="Explore global destinations, find hidden gems, and get inspired by community shared trips."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-zinc-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm">
          <p>© 2026 GlobeTrotter. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all group"
    >
      <div className="mb-6 p-4 rounded-xl bg-zinc-900 border border-white/5 w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
