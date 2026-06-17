

import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white px-4">

            <h1 className="text-6xl font-bold text-cyan-400 mb-4">
                404
            </h1>

            <h2 className="text-2xl font-semibold mb-2">
                Page Not Found
            </h2>

            <p className="text-slate-400 text-center max-w-md mb-6">
                Sorry, the page you are looking for doesn’t exist or has been moved.
            </p>

            <Link
                href="/"
                className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition"
            >
                Back to Home
            </Link>

        </div>
    );
};

export default NotFound;