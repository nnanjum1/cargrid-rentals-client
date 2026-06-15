"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const CarDetailsPage = () => {
    const { id } = useParams();
    const { data: session } = authClient.useSession();
    const user = session?.user

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [dateError, setDateError] = useState("");
    const [existingBookings, setExistingBookings] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [driverNeeded, setDriverNeeded] = useState("No");
    const [note, setNote] = useState("");

    const getToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

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


    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`
                );

                const data = await res.json();
                setExistingBookings(data);
            } catch (err) {
                console.log(err);
            }
        };

        if (id) fetchBookings();
    }, [id]);

    const isDateBooked = (date) => {
        return existingBookings.includes(date);
    };




    const handleBooking = async () => {
        const bookingData = {
            carId: id,
            userEmail: user.email,
            driverNeeded,
            note,
            bookingDate,
            price: car.price,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
        });

        const data = await res.json();

        if (!res.ok) {
            toast.error(data.message || "Booking failed");
            return;
        }

        toast.success("Booking Done");

        setCar((prev) => ({
            ...prev,
            bookingCount: (prev.bookingCount || 0) + 1,
        }));

        setOpenModal(false);
    };

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
                        onClick={() => {
                            if (!session) {
                                toast.error("Please login first");
                                return;
                            }
                            setOpenModal(true);
                        }}
                        disabled={car.availability !== "Available"}
                        className={`w-full mt-4 py-3 rounded-lg font-semibold transition ${car.availability === "Available"
                            ? "bg-cyan-500 text-black hover:bg-cyan-400"
                            : "bg-gray-700 text-gray-300 cursor-not-allowed"
                            }`}
                    >
                        Book This Car
                    </button>


                </div>
            </div>

            {openModal && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
                    <div className="bg-slate-900 p-6 rounded-xl w-[90%] max-w-md">




                        <label className="text-sm">Driver Needed</label>
                        <select
                            value={driverNeeded}
                            onChange={(e) => setDriverNeeded(e.target.value)}
                            className="w-full mt-1 mb-4 p-2 bg-slate-800 rounded"
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>


                        <label className="text-sm">Booking Date</label>
                        <input
                            type="date"
                            min={getToday()}
                            value={bookingDate}
                            onChange={(e) => {
                                const selectedDate = e.target.value;
                                setBookingDate(selectedDate);

                                if (isDateBooked(selectedDate)) {
                                    setDateError("❌ This car is already booked on this date");
                                } else {
                                    setDateError("");
                                }
                            }}
                            className="w-full mt-1 mb-1 p-2 bg-slate-800 rounded"
                        />

                        {dateError && (
                            <p className="text-red-400 text-sm mb-3">
                                {dateError}
                            </p>
                        )}


                        <label className="text-sm">Special Note</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full mt-1 mb-4 p-2 bg-slate-800 rounded"
                            rows="3"
                            placeholder="Any special request..."
                        />


                        <div className="flex gap-3">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="w-1/2 bg-gray-700 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleBooking}
                                disabled={!!dateError || !bookingDate}
                                className="w-1/2 bg-cyan-500 text-black py-2 rounded font-semibold disabled:opacity-50"
                            >
                                Book Now
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDetailsPage;