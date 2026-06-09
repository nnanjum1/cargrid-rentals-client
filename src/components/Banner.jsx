import Link from 'next/link'
import React from 'react'

const Banner = () => {
    return (
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            <div className="w-[80%] mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center gap-12">

                <div className="flex-1 text-center lg:text-left">

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                        Find & Rent Your <span className="text-cyan-400">Perfect Car</span> Easily
                    </h1>

                    <p className="mt-5 text-slate-300 text-sm sm:text-base leading-7 max-w-xl mx-auto lg:mx-0">
                        Explore a wide range of cars, compare prices, and book instantly.
                        CarGrid Rentals makes your journey smooth, fast, and secure.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">

                        <Link
                            href="/explore"
                            className="bg-cyan-500 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-400 transition"
                        >
                            Explore Cars
                        </Link>

                        <Link
                            href="/add-car"
                            className="border border-cyan-400 text-cyan-400 px-6 py-3 rounded-lg hover:bg-cyan-400 hover:text-slate-900 transition"
                        >
                            Add Your Car
                        </Link>

                    </div>

                    <div className="mt-10 flex justify-center lg:justify-start gap-8 text-sm text-slate-400">

                        <div>
                            <p className="text-white text-lg font-bold animate-pulse">100+</p>
                            Cars Listed
                        </div>

                        <div>
                            <p className="text-white text-lg font-bold">24/7</p>
                            Support
                        </div>

                        <div>
                            <p className="text-white text-lg font-bold">Fast</p>
                            Booking
                        </div>

                    </div>
                </div>


                <div className="flex-1 flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                        alt="Car Banner"
                        className="w-full max-w-md lg:max-w-lg rounded-2xl shadow-2xl border border-slate-800"
                    />
                </div>

            </div>
        </section>
    )
}

export default Banner