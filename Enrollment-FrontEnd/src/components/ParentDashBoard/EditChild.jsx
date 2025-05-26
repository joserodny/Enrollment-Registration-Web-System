import Swal from "sweetalert2";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export const EditChild = async (child) => {
    const { value: formValues, isConfirmed } = await Swal.fire({
        title: `Edit ${child.name}`,
        html: `
        <input type="text" id="name" class="swal2-input" placeholder="Name" value="${child.name}">
        <input type="date" id="dob" class="swal2-input" value="${child.date_of_birth.split('T')[0]}">
        <input type="text" id="lrn" class="swal2-input" placeholder="LRN or Student ID" value="${child.lrn_or_student_id}">
        `,
        confirmButtonText: 'Save',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const name = document.getElementById('name').value;
            const dob = document.getElementById('dob').value;
            const lrn = document.getElementById('lrn').value;

            if (!name || !dob || !lrn) {
                Swal.showValidationMessage("Please fill all fields");
                return false;
            }

            return { name, dob, lrn };
        },
    });

    if (isConfirmed && formValues) {
        const token = localStorage.getItem("auth_token");

        axios.put(`${apiUrl}/api/update-child/${child.id}`, {
            child_name: formValues.name,
            date_of_birth: formValues.dob,
            lrn_or_student_id: formValues.lrn,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            Swal.fire("Updated!", "Child updated successfully.", "success").then(() => {
                window.location.reload(); // Reload after alert is closed
            });
            return true;
        })
        .catch((error) => {
            console.error("Update error:", error.response?.data || error.message);
            Swal.fire("Error", "Something went wrong while updating.", "error");
        });
    }

    return false;
};

