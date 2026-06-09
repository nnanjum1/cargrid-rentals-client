"use client";

import { motion } from "framer-motion";

const steps = [
    {
        title: "Search Cars",
        desc: "Explore available cars based on your preference.",
    },
    {
        title: "Book Instantly",
        desc: "Select your car and book it in seconds.",
    },
    {
        title: "Enjoy Ride",
        desc: "Pick up the car and enjoy your journey safely.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-slate-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-cyan-400"
                >
                    How It Works
                </motion.h2>

                <p className="text-slate-400 mt-3">
                    Simple 3-step process to rent your car.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-slate-950 border border-slate-800 p-6 rounded-xl hover:scale-105 transition"
                        >
                            <div className="text-cyan-400 text-2xl font-bold mb-2">
                                0{index + 1}
                            </div>

                            <h3 className="text-xl font-semibold">
                                {step.title}
                            </h3>

                            <p className="text-sm text-slate-400 mt-2">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}