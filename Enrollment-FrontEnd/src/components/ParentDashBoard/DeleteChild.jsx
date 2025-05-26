import Swal from "sweetalert2";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const DeleteChild = ({ childId, setChildren }) => {
    const handleDelete = () => {
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
                    setChildren((prev) => prev.filter((child) => child.id !== childId));
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

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md mr-2"
        >
            Delete
        </button>
    );
};