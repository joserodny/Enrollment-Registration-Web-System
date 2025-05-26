import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const EnrollmentPage = () => {
        const [parentData, setParentData] = useState({
            parent_name: '',
            email: '',
            contact_number: '',
            relationship: '',
        });

        const [childData, setChildData] = useState([
            { child_name: '', date_of_birth: '', lrn_or_student_id: '' }
        ]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setParentData(prev => ({ ...prev, [name]: value }));
        };

        const handleChildChange = (index, e) => {
            const { name, value } = e.target;
            const updatedChildren = [...childData];
            updatedChildren[index][name] = value;
            setChildData(updatedChildren);
        };

        const addChild = () => {
            setChildData([...childData, { child_name: '', date_of_birth: '', lrn_or_student_id: '' }]);
        };

        const removeChild = (index) => {
            const updatedChildren = childData.filter((_, i) => i !== index);
            setChildData(updatedChildren);
        };

        const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Submitting Enrollment',
            text: 'Please wait while we process your registration.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        axios.post(`${apiUrl}/api/register`, {
            parent: parentData,
            children: childData
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setParentData({
                parent_name: '',
                email: '',
                contact_number: '',
                relationship: '',
            });
            setChildData([{ child_name: '', date_of_birth: '', lrn_or_student_id: '' }]);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.data.message,
                showConfirmButton: false,   
                timer: 2000,                   
                timerProgressBar: true,        
                willClose: () => {
                    window.location.href = '/';
                }
            });
        })
        .catch(error => {
                const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                });
            });
        };
    return (
        <div className="h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 max-w-full sm:max-w-2xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-2 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="w-full max-w-2xl mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Register your Child</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    Please fill out all required fields to complete enrollment
                                </p>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-6">
                                {/* Student Information Section */}
                                <div className="space-y-4">
                                    <h3 className="font-medium text-gray-900">Student Information</h3>
                                    <button
                                        type="button"
                                        onClick={addChild}
                                        className="text-blue-600 hover:text-blue-800 font-medium text-sm mb-4"
                                        >
                                        + Add Another Child
                                    </button>
                                    {childData.map((child, index) => (
                                    <div key={index}  className="grid grid-cols-3 gap-4">
                                        <div className="flex flex-col">
                                            <label className="leading-loose">Name of Child*</label>
                                            <input 
                                                type="text" 
                                                name="child_name"
                                                value={child.child_name}
                                                onChange={(e) => handleChildChange(index, e)}
                                                className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                                                placeholder="Full name" 
                                                required 
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                        <label className="leading-loose">Birthday*</label>
                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                            <input 
                                                type="date"
                                                name="date_of_birth"
                                                value={child.date_of_birth}
                                                onChange={(e) => handleChildChange(index, e)}
                                                className="pr-4 pl-10 py-2 border focus:ring-blue-500 focus:border-blue-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                                                required 
                                            />
                                            <div className="absolute left-3 top-2">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        </div>

                                        <div className="flex flex-col">
                                        <label className="leading-loose">LRN or Student ID</label>
                                        <input 
                                            type="text" 
                                            name="lrn_or_student_id"
                                            value={child.lrn_or_student_id}
                                            onChange={(e) => handleChildChange(index, e)}
                                            className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                                            placeholder="If applicable" 
                                        />

                                        <div className="flex flex-col">
                                            {childData.length > 1 && (
                                                    <button
                                                    type="button"
                                                    onClick={() => removeChild(index)}
                                                    className="text-red-600 hover:text-red-800 text-sm"
                                                    >
                                                    Remove
                                                    </button>
                                                )}
                                        </div>
                                        </div>

                                    </div>
                                    ))}
                                </div>

                                {/* Parent/Guardian Information Section */}
                                <div className="space-y-4">
                                    <h3 className="font-medium text-gray-900">Parent/Guardian Information</h3>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Parent Name*</label>
                                        <input 
                                            type="text" 
                                            name="parent_name"
                                            value={parentData.parent_name}
                                            onChange={handleChange}
                                            className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                                            placeholder="Full name" 
                                            required 
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Parent Contact Number*</label>
                                        <input 
                                            type="tel" 
                                            name="contact_number"
                                            value={parentData.contact_number}
                                            onChange={handleChange}
                                            className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                                            placeholder="+63 912 345 6789" 
                                            required 
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Parent Email Address*</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={parentData.email}
                                            onChange={handleChange}
                                            className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                                            placeholder="your@email.com" 
                                            required 
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Parent Relationship*</label>
                                        <select 
                                            name="relationship"
                                            value={parentData.relationship}
                                            onChange={handleChange}
                                            className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" 
                                            required
                                        >
                                            <option value="">Select relationship</option>
                                            <option>Mother</option>
                                            <option>Father</option>
                                            <option>Guardian</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex items-center space-x-4">
                                <a href="/" className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none border border-gray-300 hover:bg-gray-50">
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg> Cancel
                                </a>
                                <button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none transition duration-200">
                                    Submit Enrollment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}