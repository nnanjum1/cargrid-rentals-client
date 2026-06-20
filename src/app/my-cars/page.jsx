"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import Link from "next/link";

const MyCars = () => {
    const { data: session, isPending } = authClient.useSession();
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchCars = async () => {
            try {
                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/my-cars`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData?.token}`,
                        },
                    }
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

    const handleDelete = async () => {
        try {
            const { data: tokenData } = await authClient.token();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/cars/${deleteId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${tokenData?.token}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Delete failed");
                return;
            }

            toast.success("Car deleted");

            setCars((prev) =>
                prev.filter((car) => car._id !== deleteId)
            );

            setShowDeleteModal(false);
            setDeleteId(null);
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">

                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

                <p className="mt-4 text-slate-400">Loading your cars...</p>
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
                                        <Link href={`/edit-car/${car._id}`} className="flex-1">
                                            <button className="w-full bg-yellow-500 text-black py-2 rounded-lg font-semibold hover:bg-yellow-400">
                                                Edit
                                            </button>
                                        </Link>

                                        <button
                                            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-400"
                                            onClick={() => {
                                                setDeleteId(car._id);
                                                setShowDeleteModal(true);
                                            }}
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

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-slate-900 p-6 rounded-xl w-[90%] max-w-md border border-slate-700">

                        <h2 className="text-xl font-bold text-red-400 mb-3">
                            Delete Car
                        </h2>

                        <p className="text-slate-300 mb-6">
                            Are you sure you want to delete this car? This action cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setDeleteId(null);
                                }}
                                className="w-1/2 bg-gray-700 py-2 rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="w-1/2 bg-red-500 py-2 rounded-lg font-semibold hover:bg-red-400"
                            >
                                Yes
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>

    );
};

export default MyCars;