import { useState, useEffect } from "react";
import axios from "axios";
import { LogoutButton } from "../components/Logout";
import { EditChild } from "../components/ParentDashBoard/EditChild";
import { AddChild } from "../components/ParentDashBoard/AddChild";
import { DeleteChild } from "../components/ParentDashBoard/DeleteChild";
const apiUrl = import.meta.env.VITE_API_URL;

export const ParentDashboardPage = () => {
    const [children, setChildren] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        axios.get(`${apiUrl}/api/my-children`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setChildren(response.data.children);
        })
        .catch((error) => {
            console.error("Error fetching children:", error.response?.data);
        })
        .finally(() => {
            setLoading(false); // Done loading
        });
    }, []);

    return (
        <div className="w-full h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col">
                    <div className="mb-4 mt-10">
                        <h1 className="text-3xl font-bolder leading-tight text-gray-900">Child List</h1>
                    </div>

                    <div className="-my-2 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="flex justify-end items-center space-x-4 my-5">
                            <div className="bg-blue-700 w-20 text-center rounded-2xl">
                                <a href="/" className="cursor-pointer py-2 inline-block text-white px-2 font-semibold">Back</a>
                            </div>
                            <div className="bg-red-700 w-20 text-center rounded-2xl">
                                <LogoutButton />
                            </div>
                        </div>
                        
                        <div className="align-middle inline-block w-full shadow overflow-x-auto sm:rounded-lg border-b border-gray-200">
                            <AddChild setChildren={setChildren} />

                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-50 text-xs leading-4 text-gray-500 uppercase tracking-wider">
                                        <th className="px-6 py-3 text-left font-medium">Child Name</th>
                                        <th className="px-6 py-3 text-left font-medium">Birthday</th>
                                        <th className="px-6 py-3 text-left font-medium">LRN or Student ID</th>
                                        <th className="px-6 py-3 text-left font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                {loading ? (
                                        <tr>
                                        <td className="px-6 py-4 text-center" colSpan="4">
                                            Loading...
                                        </td>
                                        </tr>
                                    ) : children.length === 0 ? (
                                        <tr>
                                        <td className="px-6 py-4 text-center" colSpan="4">
                                            No children found.
                                        </td>
                                        </tr>
                                    ) : (
                                        children.map((child) => (
                                            <tr key={child.id} className="border-b border-gray-200">
                                                <td className="px-6 py-4 whitespace-nowrap">{child.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(child.date_of_birth).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{child.lrn_or_student_id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={async () => {
                                                            const updated = await EditChild(child);
                                                            if (updated) window.location.reload();
                                                        }}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2"
                                                    >
                                                        Edit
                                                    </button>
                                                    <DeleteChild childId={child.id} setChildren={setChildren} />
                                                </td>
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
};