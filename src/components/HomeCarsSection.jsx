"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const HomeCarsSection = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`);

                if (!res.ok) throw new Error("Failed to load cars");

                const data = await res.json();

                setCars(data.slice(0, 6));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    return (
        <section className="bg-slate-950 text-white py-16">
            <div className="w-[85%] mx-auto">


                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-cyan-400">
                        Available Cars
                    </h2>
                    <p className="text-slate-400 mt-2">
                        Choose your perfect ride
                    </p>
                </div>


                {loading && (
                    <div className="flex justify-center py-10">
                        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}


                {error && (
                    <p className="text-center text-red-400">{error}</p>
                )}

                {!loading && !error && (
                    <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {cars.map((car) => (
                            <div
                                key={car._id}
                                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
                            >
                                <img
                                    src={car.image}
                                    className="h-48 w-full object-cover"
                                />

                                <div className="p-5">
                                    <h2 className="text-xl text-cyan-400 font-bold">
                                        {car.name}
                                    </h2>

                                    <p className="text-slate-400 text-sm">
                                        {car.type} • {car.seat} Seats
                                    </p>

                                    <p className="mt-2 text-lg font-bold">
                                        BDT {car.price} <span className="font-light text-slate-400 ">/day</span>
                                    </p>

                                    <Link
                                        href={`/car/${car._id}`}
                                        className="block mt-4 text-center bg-cyan-500 text-black py-2 rounded-lg font-semibold"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link
                        href="/explore"
                        className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition"
                    >
                        View All Cars
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default HomeCarsSection;