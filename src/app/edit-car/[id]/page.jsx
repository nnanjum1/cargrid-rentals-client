"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";


const EditCarPage = async () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;



    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        name: "",
        price: "",
        type: "",
        image: "",
        seat: "",
        location: "",
        description: "",
        availability: "Available",
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`
                );

                const data = await res.json();

                setForm({
                    name: data.name,
                    price: data.price,
                    type: data.type,
                    image: data.image,
                    seat: data.seat,
                    location: data.location,
                    description: data.description,
                    availability: data.availability,
                });
            } catch (err) {
                toast.error("Failed to load car");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCar();
    }, [id]);


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        const { data: tokenData } = await authClient.token()


        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/cars/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': `Bearer ${tokenData?.token}`
                    },
                    body: JSON.stringify({
                        ...form,
                        updatedBy: user.email,
                        updatedAt: new Date(),
                    }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Update failed");
                return;
            }

            toast.success("Car updated successfully");
            router.push("/my-cars");
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">

                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

                <p className="mt-4 text-slate-400">Loading...</p>
            </div>
        );
    }


    if (!session) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
                <h1 className="text-2xl font-bold text-cyan-400 mb-3">
                    Edit Car
                </h1>
                <p className="text-slate-400">
                    Please login to edit this car
                </p>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-3xl bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h1 className="text-3xl font-bold text-cyan-400 text-center mb-8">
                    Edit Car
                </h1>

                <form
                    onSubmit={handleUpdate}
                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Car Name"
                        className="p-3 bg-slate-800 rounded text-white"
                    />

                    <input
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        type="number"
                        placeholder="Price"
                        className="p-3 bg-slate-800 rounded text-white"
                    />

                    <input
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        placeholder="Type"
                        className="p-3 bg-slate-800 rounded text-white"
                    />

                    <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        className="p-3 bg-slate-800 rounded text-white"
                    />

                    <input
                        name="seat"
                        value={form.seat}
                        onChange={handleChange}
                        type="number"
                        placeholder="Seats"
                        className="p-3 bg-slate-800 rounded text-white"
                    />

                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Location"
                        className="p-3 bg-slate-800 rounded text-white"
                    />

                    <select
                        name="availability"
                        value={form.availability}
                        onChange={handleChange}
                        className="p-3 bg-slate-800 rounded text-white"
                    >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="p-3 bg-slate-800 rounded md:col-span-2 text-white"
                        rows="4"
                    />

                    <button
                        type="submit"
                        disabled={saving}
                        className="md:col-span-2 bg-cyan-500 text-black py-3 rounded-lg font-semibold hover:bg-cyan-400 transition"
                    >
                        {saving ? "Updating..." : "Update Car"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditCarPage;