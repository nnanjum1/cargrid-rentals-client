import Link from 'next/link'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">


                <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">
                    Login to CarGrid
                </h1>


                <form className="space-y-5">


                    <div>
                        <label className="text-sm text-slate-300">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>


                    <div>
                        <label className="text-sm text-slate-300">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-cyan-500 text-slate-900 font-semibold py-3 rounded-lg hover:bg-cyan-400 transition"
                    >
                        Login
                    </button>
                </form>


                <div className="flex items-center gap-3 my-6">
                    <div className="h-px bg-slate-700 flex-1"></div>
                    <p className="text-sm text-slate-400">OR</p>
                    <div className="h-px bg-slate-700 flex-1"></div>
                </div>


                <button className="w-full flex items-center justify-center gap-3 border border-slate-700 py-3 rounded-lg hover:bg-slate-800 transition text-white">
                    <FaGoogle className="text-red-400" />
                    Sign in with Google
                </button>


                <p className="text-center text-sm text-slate-400 mt-6">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-cyan-400 hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default LoginPage