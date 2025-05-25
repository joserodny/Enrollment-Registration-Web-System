import axios from 'axios';
import Swal from 'sweetalert2';
const apiUrl = import.meta.env.VITE_API_URL;

export const ExportButton = () => {
    const downloadEnrollees = async () => {
        Swal.fire({
            title: 'Preparing File',
            html: 'Please wait while we generate the Excel file...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const token = localStorage.getItem('auth_token'); // or your auth token
        const response = await axios.get(`${apiUrl}/api/export-enrollees`, {
            responseType: 'blob',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });

        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `enrollees_${new Date().toISOString().slice(0,10)}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        Swal.fire({
            icon: 'success',
            title: 'Download Complete!',
            text: 'The enrollees data has been downloaded successfully.',
            confirmButtonText: 'OK'
        });
    };

    return (
        <button 
        onClick={downloadEnrollees}
        className="my-2 inline-block w-20 px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:shadow-outline transition-colors"
        >
        Export
        </button>
    );
};