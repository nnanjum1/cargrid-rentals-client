"use client";

import { motion } from "framer-motion";

const features = [
    {
        title: "Easy Booking",
        desc: "Book your preferred car in just a few clicks with a smooth experience.",
    },
    {
        title: "Verified Cars",
        desc: "All cars are verified and managed by trusted owners.",
    },
    {
        title: "Affordable Prices",
        desc: "Compare prices and choose the best deal for your journey.",
    },
];

export default function WhyChoose() {
    return (
        <section className="bg-slate-950 text-white py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl font-bold text-cyan-400"
                >
                    Why Choose CarGrid Rentals?
                </motion.h2>

                <p className="text-slate-400 mt-3">
                    A smarter way to rent cars with trust and convenience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                    {features.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-slate-900 border border-slate-800 p-6 rounded-xl hover:border-cyan-400 transition"
                        >
                            <h3 className="text-xl font-semibold text-cyan-400">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-400 mt-2">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}