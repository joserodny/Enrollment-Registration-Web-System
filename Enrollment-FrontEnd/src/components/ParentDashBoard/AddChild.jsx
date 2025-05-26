import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const AddChild = ({ setChildren }) => {
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const token = localStorage.getItem("auth_token");
            try {
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
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <button
            onClick={handleAddChild}
            disabled={isLoading}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-2xl inline-flex items-center ml-2 my-5"
            >
            {isLoading ? (
                'Adding...'
            ) : (
                <>
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
                </>
            )}
        </button>
    );
};