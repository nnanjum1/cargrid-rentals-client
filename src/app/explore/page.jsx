"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const ExplorePage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    const fetchCars = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/cars?search=${search}&type=${type}`
            );

            const data = await res.json();
            setCars(data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchCars();
        }, 500);

        return () => clearTimeout(delay);
    }, [search || "", type || ""]);

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 py-10">


            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-cyan-400">
                    Explore Cars
                </h1>
            </div>

            <div className="w-[80%] mx-auto flex flex-col md:flex-row gap-3 mb-10">

                <input
                    type="text"
                    placeholder="Search car name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
                />


                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-700"
                >
                    <option value="">All Types</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Hatchback">Hatchback</option>
                </select>
            </div>

            {loading && (
                <div className="flex justify-center items-center py-20">
                    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}


            {!loading && (
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


            {!loading && cars.length === 0 && (
                <p className="text-center text-slate-400 mt-10">
                    No cars found
                </p>
            )}
        </div>
    );
};

export default ExplorePage;