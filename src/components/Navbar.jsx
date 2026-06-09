"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
const Navbar = () => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const isActive = (path) => pathname === path;

    const linkClass = (path) =>
        `transition hover:text-cyan-400 ${isActive(path) ? "text-cyan-400 border-b-2 border-cyan-400 pb-1" : "text-slate-200"
        }`;

    return (
        <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-800">
            <div className="w-[80%] mx-auto  py-4 flex justify-between items-center">


                <h1 className="text-2xl font-bold tracking-wide text-cyan-400">
                    CarGrid Rentals
                </h1>

                <div className="hidden md:flex items-center gap-8 font-medium text-slate-200">

                    <Link href="/" className={linkClass("/")} >
                        Home
                    </Link>

                    <Link href="/explore" className={linkClass("/explore")}>
                        Explore Cars
                    </Link>

                    <Link href="/add-car" className={linkClass("/add-car")}>
                        Add Car
                    </Link>

                    <Link href="/my-bookings" className={linkClass("/my-bookings")}>
                        My Bookings
                    </Link>


                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition"
                    >
                        Login
                    </Link>


                    <Link
                        href="/register"
                        className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-900 font-semibold hover:bg-cyan-400 transition"
                    >
                        Register
                    </Link>
                </div>


                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-3xl text-cyan-400"
                >
                    ☰
                </button>
            </div>


            {open && (
                <div className="md:hidden px-4 pb-4 space-y-4 flex flex-col bg-slate-900 border-t border-slate-800 text-slate-200">

                    <Link onClick={() => setOpen(false)} href="/" className={linkClass("/")}>
                        Home
                    </Link>

                    <Link onClick={() => setOpen(false)} href="/explore" className={linkClass("/explore")}>
                        Explore Cars
                    </Link>

                    <Link onClick={() => setOpen(false)} href="/add-car" className={linkClass("/add-car")}>
                        Add Car
                    </Link>

                    <Link onClick={() => setOpen(false)} href="/my-bookings" className={linkClass("/my-bookings")}>
                        My Bookings
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        href="/login"
                        className="block text-cyan-400"
                    >
                        Login
                    </Link>

                    <Link
                        onClick={() => setOpen(false)}
                        href="/register"
                        className="block text-cyan-400 font-semibold"
                    >
                        Register
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;