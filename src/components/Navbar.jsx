"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
const Navbar = () => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const pathname = usePathname();
    const isActive = (path) => pathname === path;

    const linkClass = (path) =>
        `transition hover:text-cyan-400 ${isActive(path) ? "text-cyan-400 border-b-2 border-cyan-400 pb-1" : "text-slate-200"
        }`;

    const { data: session } = authClient.useSession()
    console.log(session)

    const user = session?.user
    console.log(user)

    const handleLogout = async () => {
        await authClient.signOut();
        setDropdown(false);
        router.push("/");
    };

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

                    {user ? (
                        <div className="relative">


                            <div
                                onClick={() => setDropdown(!dropdown)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <img
                                    src={user.image || "/default.png"}
                                    className="w-9 h-9 rounded-full border border-cyan-400 object-cover"
                                />
                                <span className="text-slate-200">
                                    {user.name}
                                </span>
                            </div>


                            {dropdown && (
                                <div className="absolute right-0 mt-3 w-52 bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">

                                    <Link
                                        href="/add-car"
                                        onClick={() => setDropdown(false)}
                                        className="block px-4 py-2 hover:bg-slate-700"
                                    >
                                        Add Car
                                    </Link>

                                    <Link
                                        href="/my-bookings"
                                        onClick={() => setDropdown(false)}
                                        className="block px-4 py-2 hover:bg-slate-700"
                                    >
                                        My Bookings
                                    </Link>

                                    <Link
                                        href="/my-cars"
                                        onClick={() => setDropdown(false)}
                                        className="block px-4 py-2 hover:bg-slate-700"
                                    >
                                        My Added Cars
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 hover:bg-red-600 text-red-400"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (<>
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
                    </>)}
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

                    {user ? (
                        <>
                            <div className="flex items-center gap-3 py-2 ps-3">
                                <img
                                    src={user.image || "/default.png"}
                                    className="w-10 h-10 rounded-full border border-cyan-400"
                                />
                                <span>{user.name}</span>
                            </div>

                            <Link className="ps-4" onClick={() => setOpen(false)} href="/add-car">Add Car</Link>
                            <Link className="ps-4" onClick={() => setOpen(false)} href="/my-bookings">My Bookings</Link>
                            <Link className="ps-4" onClick={() => setOpen(false)} href="/my-cars">My Added Cars</Link>

                            <button
                                onClick={handleLogout}
                                className="text-red-500"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link onClick={() => setOpen(false)} href="/login">Login</Link>
                            <Link onClick={() => setOpen(false)} href="/register">Register</Link>
                        </>
                    )}
                </div>


            )}
        </nav>
    );
};

export default Navbar;