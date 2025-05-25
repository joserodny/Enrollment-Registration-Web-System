import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;

export const LoginPage = () => {
        const [formData, setFormData] = useState({
            email: '',
            password: '',
        });

    const navigate = useNavigate();

    const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

    const handleLogin = () => {
        axios.post(`${apiUrl}/api/login`, 
            formData,
            { headers: { 'Content-Type': 'application/json' } },
        )
        .then(response => {
            const data = response.data;
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('user_role', data.user.role);

            Swal.fire({
                title: 'Login Successful',
                text: 'You have successfully logged in.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
            });

            setFormData({
                email: '',
                password: '',
            });

            navigate('/Dashboard'); 
        })
        .catch(error => {
            Swal.fire(
                'Login Failed',
                error.response?.data?.message || 'An error occurred during login.',
                'error'
            );
        });

    }    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
                    <div className="px-5 py-7">
                        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                        />

                        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                            
                        />

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        >
                            Login
                        </button>
                    </div>

                    <div className="py-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="pl-5 text-center sm:text-left whitespace-nowrap">
                                <a href="/" className="font-semibold text-sm text-gray-600 hover:text-blue-500 focus:text-blue-700">Back</a>
                            </div>

                            <div className="pl-5 text-center sm:text-left whitespace-nowrap">
                                <a href="/Request-Password" className="font-semibold text-sm text-gray-600 hover:text-blue-500 focus:text-blue-700">Reset Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}