import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaCloudUploadAlt, FaUser, FaEnvelope, FaImage, FaMapMarkerAlt, FaPhone, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { MdCategory, MdTitle, MdDescription } from 'react-icons/md';

const AddPost = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imageError, setImageError] = useState(null);
    const fileInputRef = useRef(null);

    const { data: currentUser = [] } = useQuery({
        queryKey: ['currentUser', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            if (!file.type.match('image.*')) {
                setImageError('Please select an image file (JPEG, PNG, etc.)');
                setImagePreview(null);
                return;
            }


            if (file.size > 5 * 1024 * 1024) {
                setImageError('Image size must be less than 5MB');
                setImagePreview(null);
                return;
            }

            setImageError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (imageFile) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axiosPublic.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            setIsUploading(false);
            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            setIsUploading(false);
            throw error;
        }
    };


    const onSubmit = async (data) => {
        try {

            const file = fileInputRef.current?.files?.[0];

            if (!file) {
                setImageError('Please upload an image of the item');
                return;
            }

            const imageUrl = await uploadImage(file);

            const postData = {
                ...data,
                image: imageUrl,
                ownerName: user?.displayName || 'Anonymous',
                ownerImage: user?.photoURL || '/default-avatar.png',
                ownerEmail: user?.email,
                // timestamp: new Date(),
            };

            const res = await axiosPublic.post('/posts', postData);

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your post has been added successfully',
                showConfirmButton: false,
                timer: 1500
            });

            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Something went wrong! Please try again.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="bg-indigo-900 py-4 px-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                            {user?.displayName ? `${user.displayName}'s New Post` : 'Create New Post'}
                        </h1>
                        <p className="text-indigo-200 text-center mt-1">
                            Help reunite lost items with their owners
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-gray-700 font-medium">
                                    <MdCategory className="mr-2" />
                                    Post Type
                                </label>
                                <select
                                    {...register('type', { required: 'Post type is required' })}
                                    className={`select select-bordered w-full ${errors.type ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Select Post Type</option>
                                    <option value="lost">Lost Item</option>
                                    <option value="found">Found Item</option>
                                </select>
                                {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-gray-700 font-medium">
                                    <MdTitle className="mr-2" />
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="What item are you posting about?"
                                    {...register('name', { required: 'Item name is required' })}
                                    className={`input input-bordered w-full ${errors.name ? 'border-red-500' : ''}`}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="flex items-center text-gray-700 font-medium">
                                <FaImage className="mr-2" />
                                Item Image <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FaCloudUploadAlt className="w-8 h-8 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div className="flex-1">
                                    {imagePreview ? (
                                        <div className="h-40 flex items-center justify-center border rounded-lg overflow-hidden">
                                            <img src={imagePreview} alt="Preview" className="max-h-full max-w-full object-contain" />
                                        </div>
                                    ) : (
                                        <div className="h-40 flex items-center justify-center border rounded-lg bg-gray-50">
                                            <p className="text-gray-400">No image selected</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {imageError && (
                                <div className="flex items-center text-red-500 text-sm mt-1">
                                    <FaExclamationTriangle className="mr-1" />
                                    {imageError}
                                </div>
                            )}
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center text-gray-700 font-medium">
                                    <MdCategory className="mr-2" />
                                    Category
                                </label>
                                <select
                                    {...register('category', { required: 'Category is required' })}
                                    className={`select select-bordered w-full ${errors.category ? 'border-red-500' : ''}`}
                                >
                                    <option value="">Select a category</option>
                                    <option value="mobile">Mobile Phone</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="jewelry">Jewelry</option>
                                    <option value="documents">Documents</option>
                                    <option value="others">Others</option>
                                </select>
                                {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center text-gray-700 font-medium">
                                    <FaMapMarkerAlt className="mr-2" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    placeholder="Where was the item lost/found?"
                                    {...register('location', { required: 'Location is required' })}
                                    className={`input input-bordered w-full ${errors.location ? 'border-red-500' : ''}`}
                                />
                                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="flex items-center text-gray-700 font-medium">
                                <FaPhone className="mr-2" />
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                placeholder="Your phone number for contact"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                })}
                                className={`input input-bordered w-full ${errors.phone ? 'border-red-500' : ''}`}
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                        </div>


                        <div className="space-y-2">
                            <label className="flex items-center text-gray-700 font-medium">
                                <MdDescription className="mr-2" />
                                Description
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Provide detailed description of the item (color, brand, distinguishing features, etc.)"
                                {...register('description', {
                                    required: 'Description is required',
                                    minLength: {
                                        value: 20,
                                        message: 'Description should be at least 20 characters'
                                    }
                                })}
                                className={`textarea textarea-bordered w-full ${errors.description ? 'border-red-500' : ''}`}
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                        </div>


                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-medium text-gray-700 mb-3 flex items-center">
                                <FaInfoCircle className="mr-2 text-indigo-600" />
                                Your Contact Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <FaUser className="text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        value={user?.displayName || 'Anonymous'}
                                        disabled
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <FaEnvelope className="text-gray-400 mr-2" />
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="input input-bordered w-full bg-gray-100"
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                This information will be visible to others to contact you about this item.
                            </p>
                        </div>


                        <div className="pt-4">
                            <button
                                type="submit"
                                className={`btn btn-primary w-full  `}
                                disabled={isUploading}
                            >
                                {isUploading ? 'Uploading...' : 'Submit Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;