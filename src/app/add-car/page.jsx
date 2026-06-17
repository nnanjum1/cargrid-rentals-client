"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const AddCarPage = () => {
    const { data: session, isPending } = authClient.useSession();


    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;

        const carData = {
            name: form.name.value,
            price: form.price.value,
            type: form.type.value,
            image: form.image.value,
            seat: form.seat.value,
            location: form.location.value,
            description: form.description.value,
            availability: form.availability.value,
            bookingCount: 0,

            addedBy: session.user.email,
            addedByName: session.user.name,
            addedAt: new Date(),
        };

        console.log(carData);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(carData)
        })
        const data = await res.json();
        console.log(data)

        toast.success("Car added successfully!");
        form.reset();
        setLoading(false);
    };


    if (!session) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
                <h1 className="text-3xl font-bold text-cyan-400 mb-4">
                    Add New Car
                </h1>

                <p className="text-slate-400 mb-6">
                    Please login to add a car.
                </p>

                <Link
                    href="/login"
                    className="px-6 py-3 bg-cyan-500 text-black rounded-lg font-semibold"
                >
                    Login
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">

                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-8">
                    Add New Car
                </h1>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">


                    <div>
                        <label className="text-sm text-slate-300">Car Name</label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Toyota Corolla"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                            required
                        />
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Daily Rent Price</label>
                        <input
                            name="price"
                            type="number"
                            placeholder="2000"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                            required
                        />
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Car Type</label>
                        <select
                            name="type"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                        >
                            <option value="SUV">SUV</option>
                            <option value="Sedan">Sedan</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Seat Capacity</label>
                        <input
                            name="seat"
                            type="number"
                            placeholder="4"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                            required
                        />
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Image URL</label>
                        <input
                            name="image"
                            type="text"
                            placeholder="https://..."
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-300">Pickup Location</label>
                        <input
                            name="location"
                            type="text"
                            placeholder="Sylhet / Dhaka"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-slate-300">Availability</label>
                        <select
                            name="availability"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white"
                        >
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                    </div>


                    <div className="md:col-span-2">
                        <label className="text-sm text-slate-300">Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Write car details..."
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                            required
                        ></textarea>
                    </div>


                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-cyan-500 text-slate-900 font-semibold py-3 rounded-lg hover:bg-cyan-400 transition"
                        >
                            {loading ? "Adding Car..." : "Add Car"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddCarPage;