"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const CarDetailsPage = () => {
    const { id } = useParams();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`
                );

                if (!res.ok) throw new Error("Failed to fetch car details");

                const data = await res.json();
                setCar(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCar();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
                Loading car details...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-400">
                {error}
            </div>
        );
    }

    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
                Car not found
            </div>
        );
    }

    return (

        <div className="min-h-screen bg-[#090d11] text-white px-4 py-10">



            <div className="w-[80%] mx-auto grid md:grid-cols-2 gap-10 ">


                <div className="rounded-2xl overflow-hidden bg-slate-900">

                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-fit"
                    />
                </div>


                <div>



                    <h1 className="text-3xl font-bold">{car.name}</h1>

                    <p className="text-slate-400 mt-2">
                        {car.type} • {car.seats} Seats
                    </p>

                    <p className="mt-4 text-slate-300 leading-relaxed">
                        {car.description}
                    </p>

                    <div className="mt-6 space-y-2 text-sm text-slate-400">
                        <p>Pickup Location: {car.location}</p>
                        <p> Availability: {car.availability}</p>
                        <p> Bookings: {car.bookingCount}</p>
                    </div>

                    <div className="my-6  text-2xl font-bold text-cyan-400">
                        ${car.price}{" "}
                        <span className="text-sm text-slate-400">/day</span>
                    </div>

                    <button
                        disabled={car.availability !== "Available"}
                        className={`w-full mt-4 py-3 rounded-lg font-semibold transition ${car.availability === "Available"
                                ? "bg-cyan-500 text-black hover:bg-cyan-400"
                                : "bg-gray-700 text-gray-300 cursor-not-allowed"
                            }`}
                    >
                        Book Now
                    </button>


                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;