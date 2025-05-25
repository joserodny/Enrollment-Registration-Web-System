import { useState, useEffect } from "react";
import axios from "axios";
import { ExportButton } from "../components/ExportButton";
const apiUrl = import.meta.env.VITE_API_URL;

export const AdminDashboardPage = () => {
    const [enrollees, setEnrollees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('auth_token');

        const fetchEnrollees = async () => {
            const response = await axios.get(`${apiUrl}/api/enrollees`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    search: searchTerm,
                },
            });
            setEnrollees(response.data.enrollees);
        };

        fetchEnrollees();
    }, [searchTerm]);

    return (
    <div className="w-full h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="flex flex-col">
                <div className="mb-4">
                    <h1 className="text-3xl font-bolder leading-tight text-gray-900"></h1>
                </div>
            <div className="mb-4">
                <h1 className="text-3xl font-bolder leading-tight text-gray-900">Enrollee List</h1>
            </div>
            <div className="-mb-2 py-4 flex flex-wrap flex-grow justify-between">
                <div className="flex items-center py-2">
                <input type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                </div>
                <div className="flex items-center py-2">
                <a href="/" className="inline-block px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline">
                    Home
                </a>
                </div>
            </div>

            <ExportButton />
            <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                            <th className="px-6 py-3 text-left font-medium">Parent Name</th>
                            <th className="px-6 py-3 text-left font-medium">Child Name</th>
                            <th className="px-6 py-3 text-left font-medium">Birthday</th>
                            <th className="px-6 py-3 text-left font-medium">LRN or Student ID</th>
                            <th className="px-6 py-3 text-left font-medium">Relationship</th>
                            <th className="px-6 py-3 text-left font-medium">Contact Number</th>
                            <th className="px-6 py-3 text-left font-medium">Email</th>
                            <th className="px-6 py-3 text-left font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {enrollees.map((parent) =>
                            parent.children.map((child, idx) => (
                            <tr key={`${parent.id}-${child.id}`} className="border-b border-gray-200">
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{parent.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{child.name}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{new Date(child.date_of_birth).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{child.lrn_or_student_id}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{parent.relationship}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{parent.contact_number}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{parent.email}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"></td>
                            </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>
        </div>
    </div>
    );
}