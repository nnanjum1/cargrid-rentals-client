import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 mt-10">
            <div className="w-[80%] mx-auto  py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">


                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-2xl font-bold text-cyan-400 mb-3">
                            CarGrid Rentals
                        </h2>
                        <p className="text-sm leading-6 text-slate-400 max-w-xs md:max-w-none">
                            A modern car rental platform where users can explore, book,
                            and manage cars easily with a smooth and secure experience.
                        </p>
                    </div>


                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Useful Links
                        </h3>

                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-cyan-400 transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/explore" className="hover:text-cyan-400 transition">
                                    Explore Cars
                                </Link>
                            </li>
                            <li>
                                <Link href="/add-car" className="hover:text-cyan-400 transition">
                                    Add Car
                                </Link>
                            </li>
                            <li>
                                <Link href="/my-bookings" className="hover:text-cyan-400 transition">
                                    My Bookings
                                </Link>
                            </li>
                        </ul>
                    </div>


                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="text-lg font-semibold text-white mb-3">
                            Contact Info
                        </h3>

                        <p className="text-sm text-slate-400">
                            Sylhet, Bangladesh
                        </p>
                        <p className="text-sm text-slate-400">
                            Email: support@cargrid.com
                        </p>
                        <p className="text-sm text-slate-400">
                            Phone: +880 1234567890
                        </p>


                        <div className="flex gap-4 mt-5 text-lg">
                            <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-cyan-500 hover:text-black transition">
                                <FaFacebookF />
                            </a>

                            <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-cyan-500 hover:text-black transition">
                                <FaInstagram />
                            </a>

                            <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-cyan-500 hover:text-black transition">
                                <FaXTwitter />
                            </a>
                        </div>
                    </div>

                </div>


                <div className="border-t border-slate-800 mt-8 pt-5 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} CarGrid Rentals. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer