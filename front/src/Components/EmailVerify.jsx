import React, { useState, useEffect } from 'react';
import image from './image.webp'; // Ensure this is the correct path
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
export default function EmailVerify() {
    const [validUrl, setValidUrl] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `https://shatrughan-website.vercel.app/${encodeURIComponent(param.id)}/verify/${encodeURIComponent(param.token)}`;

                // const url = `http://localhost:5000/api/users/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (

<>
			{validUrl ? (
				<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
					<img src={image} alt="success_img" className="w-64 h-64 mb-4" />
					<h1 className="text-2xl font-bold text-red-600 mb-4">Email verified successfully</h1>
					<Link to="/login">
						<button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
					</Link>
				</div>
			) : (
                    <h1>Nai Chal RHI</h1>
			)}
		</>











    );
}
