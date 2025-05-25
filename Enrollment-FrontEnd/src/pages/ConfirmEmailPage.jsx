import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const apiUrl = import.meta.env.VITE_API_URL;

export const ConfirmEmailPage = () => {
    const { token } = useParams();
    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .post(`${apiUrl}/api/confirm-email`, { token })
        .then((res) => {
            setUserId(res.data.user_id);
        })
        .catch((err) => {
            const message = err.response?.data?.message || "Something went wrong";

            Swal.fire({
                icon: "error",
                title: "Invalid Link",
                showConfirmButton: false,
                timer: 1500,
                text: message,
            }).then(() => {
                if (message.toLowerCase().includes("invalid")) {
                    navigate("/"); // Redirect to home
                }
            });
        });
    }, [token]);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
        .post(`${apiUrl}/api/set-password`, {
            user_id: userId,
            password,
            password_confirmation: passwordConfirmation,
        })
        .then((res) => {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "Password set successfully!",
            }).then(() => {
                localStorage.setItem("token", res.data.token);
                navigate("/Dashboard");
            });
        })
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Failed",
                showConfirmButton: false,
                timer: 1500,
                text: err.response?.data?.message || "Failed to set password",
            });
        });
    };

    if (!userId) return <div>Validating link...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                        />

                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            
                        />

                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
