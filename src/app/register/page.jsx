"use client";

import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";

const RegisterPage = () => {
    const [error, setError] = useState("");

    const validatePassword = (password) => {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasLength = password.length >= 6;

        if (!hasUpper || !hasLower || !hasLength) {
            return "Password must have uppercase, lowercase, and be at least 6 characters.";
        }
        return "";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const password = e.target.password.value;
        const msg = validatePassword(password);

        if (msg) {
            setError(msg);
            return;
        }

        setError("");

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg my-15">


                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
                    Create Account
                </h1>


                <form onSubmit={handleSubmit} className="space-y-4">


                    <div>
                        <label className="text-sm text-slate-300">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                            required
                        />
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                            required
                        />
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Photo URL</label>
                        <input
                            type="text"
                            placeholder="Profile image link"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                            required
                        />
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                            required
                        />
                    </div>


                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}


                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-slate-900 font-semibold py-3 rounded-lg hover:bg-cyan-400 transition"
                    >
                        Register
                    </button>
                </form>


                <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-slate-700 flex-1"></div>
                    <p className="text-sm text-slate-400">OR</p>
                    <div className="h-px bg-slate-700 flex-1"></div>
                </div>


                <button className="w-full flex items-center justify-center gap-3 border border-slate-700 py-3 rounded-lg hover:bg-slate-800 transition text-white">
                    <FaGoogle className="text-red-400" />
                    Sign up with Google
                </button>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-cyan-400 hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>)
}

export default RegisterPage