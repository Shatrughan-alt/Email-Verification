import React, { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import axios from "axios";

export default function Register() {
    // const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = "http://localhost:5000/";
            const { data: res } = await axios.post(url, data);
            setMsg(res.message);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label
                            htmlFor="firstname"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label
                            htmlFor="lastname"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Email
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

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                        >
                            Password
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
                        {msg && <p className="text-green-500 text-sm mt-4">{msg}</p>}
                        <button type="submit" className="w-full py-2 px-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Sing Up
                        </button>

                    
                   
                </form>

                <div className="mt-6 text-center">
                    <NavLink
                        to="/login"
                        className="text-blue-500 hover:underline dark:text-blue-400"
                    >
                        Go to Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
}
