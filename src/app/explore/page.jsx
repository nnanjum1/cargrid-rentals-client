"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ExplorePage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/cars`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch cars");
                }

                const data = await res.json();
                setCars(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 py-10">


            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
                    Explore Available Cars
                </h1>
                <p className="text-slate-400 mt-2">
                    Choose your perfect car for your next ride
                </p>
            </div>


            {loading && (
                <p className="text-center text-slate-400">Loading cars...</p>
            )}


            {error && (
                <p className="text-center text-red-400">{error}</p>
            )}


            <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {cars.map((car) => (
                    <div
                        key={car._id}
                        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:scale-[1.02] transition"
                    >

                        <div className="w-full h-48 overflow-hidden">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-full object-cover hover:scale-110 transition duration-300"
                            />
                        </div>

                        <div className="p-5">

                            <h2 className="text-xl font-semibold text-cyan-400">
                                {car.name}
                            </h2>

                            <p className="text-sm text-slate-400 mt-1">
                                {car.type} • {car.seat} Seats
                            </p>

                            <p className="text-sm text-slate-400 mt-1">
                                📍 {car.location}
                            </p>

                            <p className="text-lg font-bold mt-3">
                                BDT {car.price} / day
                            </p>

                            <span
                                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${car.availability === "Available"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                                    }`}
                            >
                                {car.availability}
                            </span>


                            <Link
                                href={`/car/${car._id}`}
                                className="block mt-4 text-center bg-cyan-500 text-black font-semibold py-2 rounded-lg hover:bg-cyan-400 transition"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {!loading && cars.length === 0 && (
                <p className="text-center text-slate-400 mt-10">
                    No cars available at the moment
                </p>
            )}
        </div>
    );
};

export default ExplorePage;