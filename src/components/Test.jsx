import React from 'react';

const Test = () => {
    return (
        <div className="min-h-screen flex">
            {/* Left side - image */}
            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: "url('/login-illustration.png')" }}
            >
                {/* Optional overlay or branding */}
                <div className="w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
                    <h1 className="text-white text-4xl font-bold">Welcome Back!</h1>
                </div>
            </div>

            {/* Right side - login form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>

                    <form className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email address</label>
                            <input type="email" id="email" className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input type="password" id="password" className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                        </div>

                        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                            Log In
                        </button>

                        <div className="text-sm text-center text-gray-500">
                            Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Test;
