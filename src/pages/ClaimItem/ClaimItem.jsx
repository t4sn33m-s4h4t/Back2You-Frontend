import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ClaimItem = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const { post } = location.state || {};
    !post && navigate('/');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [receiptImage, setReceiptImage] = useState(null);
    const [itemImage, setItemImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axiosPublic.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const onSubmit = async (data) => {
        if (!itemImage && !receiptImage) {
            console.log(receiptImage)
            Swal.fire({ icon: 'error', title: 'Receipt or Any Additional Image Required', text: 'Please upload a receipt or additional image for verification' });
            return;
        }

        setIsUploading(true);

        try {
            let receiptUrl = receiptImage ? await uploadImage(receiptImage) : '';
            let itemImageUrl = itemImage ? await uploadImage(itemImage) : '';

            const claimData = {
                postId: post._id,
                postAuthor: post.ownerEmail,
                claimantName: user?.displayName || 'Anonymous',
                claimantEmail: user?.email,
                claimantImage: user?.photoURL,
                receiptUrl: receiptUrl,
                imageUrl: itemImageUrl,
                details: data.details,
                status: 'pending',
                createdAt: new Date(),
            };

            const res = await axiosPublic.post('/claims', claimData);

            if (res.data.insertedId) {
                Swal.fire({ icon: 'success', title: 'Claim Submitted!', text: 'We will reach out to you in 24 hours.', timer: 1500 });
                navigate('/my-claims');
            }
        } catch (error) {
            console.log(error)
            Swal.fire({ icon: 'error', title: 'Submission Failed', text: 'Please try again.' });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-4xl font-bold text-center text-[#1a237e] mb-6">Claim Item</h1>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h2 className="text-xl font-semibold mb-3">Item Information</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <img src={post?.image} alt={post?.name} className="h-40 object-cover rounded-md" />
                            <div>
                                <p className="text-lg font-medium">{post?.name}</p>
                                <p className="text-gray-600">Category: {post?.category}</p>
                                <p className="text-gray-600">Location: {post?.location}</p>
                                <p className="text-gray-600">Posted by: {post?.ownerName}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label className="block font-medium mb-2">Receipt </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setReceiptImage(e.target.files[0])}
                                    className="file-input file-input-bordered w-full max-w-xs"
                                />
                                {receiptImage && (
                                    <img src={URL.createObjectURL(receiptImage)} alt="Receipt preview"
                                         className="w-20 h-20 object-cover rounded-md border shadow-md" />
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block font-medium mb-2">Additional Image </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setItemImage(e.target.files[0])}
                                    className="file-input file-input-bordered w-full max-w-xs"
                                />
                                {itemImage && (
                                    <img src={URL.createObjectURL(itemImage)} alt="Item preview"
                                         className="w-20 h-20 object-cover rounded-md border shadow-md" />
                                )}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block font-medium mb-2">Detailed Description <span className="text-red-500">*</span></label>
                            <textarea
                                {...register('details', {
                                    required: 'Description is required',
                                    minLength: { value: 50, message: 'Minimum 50 characters required' }
                                })}
                                placeholder="Describe how and where you lost this item..."
                                className={`textarea textarea-bordered w-full ${errors.details ? 'border-red-500' : ''}`}
                                rows="5"
                            ></textarea>
                            {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg mb-6">
                            <h2 className="text-lg font-semibold mb-3">Your Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" value={user?.displayName || 'Anonymous'} disabled className="input input-bordered w-full bg-gray-100" />
                                <input type="email" value={user?.email} disabled className="input input-bordered w-full bg-gray-100" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="submit" className="btn bg-[#1a237e] hover:bg-blue-700 text-white"
                                    disabled={isUploading}>
                                {isUploading ? <span className="loading loading-spinner mr-2"></span> : 'Submit Claim'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ClaimItem;
