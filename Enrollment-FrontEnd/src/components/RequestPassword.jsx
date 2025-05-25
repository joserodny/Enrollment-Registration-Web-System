import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const apiUrl = import.meta.env.VITE_API_URL;

export const RequestPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${apiUrl}/api/request-password-reset`, { email })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: response.data.message,
                });
                setEmail("");
            })
            .catch((error) => {
                const message = error.response?.data?.message || "Failed to send reset request.";
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: message,
                });
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Request Password Reset</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Request Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}