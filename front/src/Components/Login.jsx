import React, { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import axios from "axios";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "shatrughan-website.vercel.app/login";
            const { data: res } = await axios.post(url, data);
            localStorage.setItem("token", res.data);
            window.location = "/";
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
            }
        }
    };


    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gray-900"
        >
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                        Sing In
                    </button>
                </form>
                
                <div className="mt-6 text-center">
                    <NavLink
                        to="/signup"
                        className="text-blue-500 hover:underline dark:text-blue-400"
                    >
                        Create an account
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
