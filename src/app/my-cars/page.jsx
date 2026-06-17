"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const MyCars = () => {
    const { data: session, isPending } = authClient.useSession();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch user's cars
    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchCars = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-cars?email=${session.user.email}`
                );

                const data = await res.json();
                setCars(data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [session]);

    // delete car
    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure to delete this car?");
        if (!confirm) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Delete failed");
                return;
            }

            toast.success("Car deleted");

            // remove from UI
            setCars((prev) => prev.filter((car) => car._id !== id));
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                Loading...
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                Please login to see your added cars
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white py-10">
            <div className="w-[90%] md:w-[80%] mx-auto">
                <h1 className="text-3xl font-bold text-cyan-400 mb-8">
                    My Added Cars
                </h1>

                {cars.length === 0 ? (
                    <p className="text-slate-400">No cars added yet.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map((car) => (
                            <div
                                key={car._id}
                                className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800"
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-52 object-cover"
                                />

                                <div className="p-5 space-y-2">
                                    <h2 className="text-xl font-semibold">
                                        {car.name}
                                    </h2>

                                    <p className="text-slate-400">
                                        {car.type} • {car.seat} seats
                                    </p>

                                    <p className="text-cyan-400 font-semibold">
                                        BDT {car.price}/day
                                    </p>

                                    <p className="text-sm text-slate-400">
                                        {car.location}
                                    </p>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            className="flex-1 bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400"
                                            onClick={() =>
                                                toast.info("Edit feature coming soon")
                                            }
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400"
                                            onClick={() =>
                                                handleDelete(car._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCars;