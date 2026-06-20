"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const MyBookingsPage = () => {
    const { data: session, isPending } = authClient.useSession();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!session?.user?.email) return;

        const fetchBookings = async () => {
            try {
                const { data: tokenData } = await authClient.token();

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${session.user.email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenData?.token}`
                        }
                    }
                );

                const data = await res.json();

                if (!Array.isArray(data)) {
                    console.error("Invalid response:", data);
                    setBookings([]);
                    return;
                }

                setBookings(data);

            } catch (err) {
                console.error(err);
                setBookings([]);
            }
        };

        fetchBookings();
    }, [session]);

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                Loading...
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4">
                <h1 className="text-3xl font-bold text-cyan-400 mb-4">
                    My Bookings
                </h1>

                <p className="text-slate-400 mb-6 text-center">
                    Please log in to see your bookings.
                </p>

                <Link
                    href="/login"
                    className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition"
                >
                    Login
                </Link>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-950 text-white py-10">
            <div className="w-[90%] md:w-[80%] mx-auto">

                <h1 className="text-3xl font-bold text-cyan-400 mb-8">
                    My Bookings
                </h1>

                {bookings.length === 0 ? (
                    <p className="text-slate-400">
                        No bookings found.
                    </p>
                ) : (
                    <div className="space-y-6">

                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex flex-col md:flex-row"
                            >

                                <img
                                    src={booking.image}
                                    alt={booking.name}
                                    className="w-full md:w-72 h-56 object-cover"
                                />


                                <div className="flex-1 p-6">

                                    <h2 className="text-2xl font-bold text-cyan-400">
                                        {booking.name}
                                    </h2>

                                    <div className="mt-4 space-y-2">

                                        <p>
                                            <span className="font-semibold">
                                                Booking Date:
                                            </span>{" "}
                                            {new Date(booking.bookingDate).toLocaleDateString()}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Total Price:
                                            </span>{" "}
                                            BDT {booking.price}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Driver Needed:
                                            </span>{" "}
                                            {booking.driverNeeded}
                                        </p>

                                        <p>
                                            <span className="font-semibold">
                                                Booking ID:
                                            </span>{" "}
                                            {booking._id}
                                        </p>

                                        {booking.note && (
                                            <p>
                                                <span className="font-semibold">
                                                    Note:
                                                </span>{" "}
                                                {booking.note}
                                            </p>
                                        )}
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

export default MyBookingsPage;