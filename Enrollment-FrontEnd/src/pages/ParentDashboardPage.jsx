import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {LogoutButton} from "../components/Logout";
import { EditChild } from "../components/ParentDashBoard/EditChil";
const apiUrl = import.meta.env.VITE_API_URL;


export const ParentDashboardPage = () => {
    const [children, setChildren] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("auth_token");

        axios
        .get(`${apiUrl}/api/my-children`, {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            setChildren(response.data.children);
        })
        .catch((error) => {
            console.error("Error fetching children:", error.response?.data);
        });
    }, []);

    const deleteChild = (childId, setChildren) => {
        // Confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("auth_token");
                axios.delete(`${apiUrl}/api/delete-child/${childId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    // Remove from UI
                    if (setChildren) {
                        setChildren((prev) => prev.filter((child) => child.id !== childId));
                    }
                    // Success message
                    Swal.fire(
                        'Deleted!',
                        'The child has been deleted.',
                        'success'
                    );
                })
                .catch((error) => {
                    console.error("Delete failed:", error);
                    Swal.fire(
                        'Error!',
                        'Failed to delete child.',
                        'error'
                    );
                });
            }
        });
    };

    const handleAddChild = async () => {
        const { value: formValues } = await Swal.fire({
            title: "Add New Child",
            html:
            `<input id="child_name" class="swal2-input" placeholder="Child Name">` +
            `<input id="child_birthday" type="date" class="swal2-input">` +
            `<input id="child_lrn" class="swal2-input" placeholder="LRN or Student ID">`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add',
            preConfirm: () => {
            const name = document.getElementById('child_name').value;
            const dob = document.getElementById('child_birthday').value;
            const lrn = document.getElementById('child_lrn').value;

            if (!name || !dob || !lrn) {
                Swal.showValidationMessage("All fields are required");
                return false;
            }

            return { name, dob, lrn };
            }
        });

        if (formValues) {
            try {
            const token = localStorage.getItem("auth_token");
            const response = await axios.post(
                `${apiUrl}/api/add-child`,
                {
                name: formValues.name,
                date_of_birth: formValues.dob,
                lrn_or_student_id: formValues.lrn,
                },
                {
                headers: { Authorization: `Bearer ${token}` },
                }
            );

            setChildren((prev) => [...prev, response.data.child]);

            Swal.fire("Success!", "Child added successfully.", "success");
            } catch (error) {
            console.error("Add child failed:", error);
            Swal.fire("Error", "Failed to add child.", "error");
            }
        }
    };


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
                    <button
                        onClick={handleAddChild}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-2xl inline-flex items-center ml-2 my-5"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add Child
                    </button>

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
                    {children.length > 0 ? (
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

                            <button
                                onClick={() => deleteChild(child.id, setChildren)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md mr-2"
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td className="px-6 py-4" colSpan="4">
                            No children found.
                        </td>
                        </tr>
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
