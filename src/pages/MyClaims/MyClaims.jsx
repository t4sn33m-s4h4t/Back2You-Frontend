import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaReceipt, FaImage, FaInfoCircle, FaClock, FaCheckCircle, FaTimesCircle, FaTrash, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';

const MyClaims = () => {

    const { user: admin } = useContext(AuthContext);
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const queryClient = useQueryClient();

    const { data: claims = [], isLoading, refetch } = useQuery({
        queryKey: ['claims', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/claims/user/${user?.email}`);
            return res.data;
        }
    });

    const { mutate: deleteClaim } = useMutation({
        mutationFn: (id) => axiosPublic.delete(`/claims/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['claims', user?.email]);
            Swal.fire({
                icon: 'success',
                title: 'Claim Deleted',
                text: 'Your claim has been successfully deleted',
                showConfirmButton: false,
                timer: 2000
            });
        },
        onError: (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Failed to delete claim',
            });
        }
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="badge badge-warning bg-yellow-400 gap-1 rounded-xl"><FaClock /> Pending</span>;
            case 'verified':
                return <span className="badge badge-success bg-green-600 gap-1 rounded-xl text-white"><FaCheckCircle /> Verified</span>;
            case 'rejected':
                return <span className="badge badge-error gap-1 rounded-xl bg-red-600 text-white"><FaTimesCircle /> Rejected</span>;
            default:
                return <span className="badge badge-info gap-1">Unknown</span>;
        }
    };

    const handleDelete = async (claimId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This will permanently delete the claim and its image!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteClaim(claimId);
                refetch();
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto p-6 bg-white rounded-xl max-w-6xl">
                <div className="bg-indigo-900 py-4 px-6 rounded-t-xl">
                    <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                        Your Claims
                    </h1>
                    <p className="text-indigo-200 text-center mt-1">
                        Here you can manage your claims. You can view, delete your claims and chat with them.
                    </p>
                </div>

                {claims.length === 0 ? (
                    <div className="text-center lg:min-h-[350px]">
                        <h2 className="text-xl font-medium my-4">You haven't made any claims yet</h2>
                        <Link to="/posts" className="btn btn-primary">
                            Browse Lost & Found Items
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-b-xl shadow-md">
                        <table className="table table-zebra w-full">
                            <thead className="bg-indigo-600 text-white text-sm">
                                <tr>
                                    <th className="p-4">Item</th>
                                    <th className="p-4">Claim Details</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Chat (Admin)</th>
                                    <th className="p-4">Chat (Who Got)</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {claims.map((claim) => (
                                    <tr key={claim._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                {claim.imageUrl ? (
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={claim.imageUrl} alt="Claimed item" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="avatar placeholder">
                                                        <div className="bg-neutral text-neutral-content mask mask-squircle w-12 h-12">
                                                            <span className="text-xl">?</span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-semibold">Claim #{claim._id.slice(-6)}</div>
                                                    <div className="text-xs text-gray-500">{new Date(claim.createdAt).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-2 text-sm text-gray-700">
                                                <div className="flex items-center gap-2">
                                                    <FaReceipt className="text-blue-600" />
                                                    {claim.receiptUrl ? 'Receipt provided' : 'No receipt'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaImage className="text-green-600" />
                                                    {claim.imageUrl ? 'Image attached' : 'No image'}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <FaInfoCircle className="text-purple-600" />
                                                    {claim.details.substring(0, 30)}...
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {getStatusBadge(claim.status)}
                                        </td>

                                        {/* Chat with Admin */}
                                        <td className="p-4">
                                            {claim.status === 'verified' ? (
                                                <Link
                                                    to={`/chats/mdtasneem6397@gmail.com`}
                                                    className="btn btn-outline btn-sm gap-2"
                                                >
                                                    <FaComments /> Chat
                                                </Link>
                                            ) : (
                                                <button
                                                    className="btn btn-disabled btn-sm gap-2"
                                                    title="Chat unavailable until verified"
                                                >
                                                    <FaTimesCircle className="text-red-500" /> Not Available
                                                </button>
                                            )}
                                        </td>

                                        {/* Chat with Post Author */}
                                        <td className="p-4">
                                            {claim.status === 'verified' ? (
                                                <Link
                                                    to={`/chats/${claim.postAuthor}`}
                                                    className="btn btn-outline btn-sm gap-2"
                                                >
                                                    <FaComments /> Chat
                                                </Link>
                                            ) : (
                                                <button
                                                    className="btn btn-disabled btn-sm gap-2"
                                                    title="Chat unavailable until verified"
                                                >
                                                    <FaTimesCircle className="text-red-500" /> Not Available
                                                </button>
                                            )}
                                        </td>

                                        {/* Actions */}
                                        <td className="p-4">
                                            <div className="flex flex-col gap-2 md:flex-row">
                                                <Link
                                                    to={`/claim-details/${claim._id}`}
                                                    className="btn btn-sm btn-outline"
                                                >
                                                    Details
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(claim._id)}
                                                    className="btn btn-sm btn-outline text-red-600 border-red-300 bg-white"
                                                    disabled={claim.status === 'verified'}
                                                    title={claim.status === 'verified' ? "Verified claims cannot be deleted" : "Delete claim"}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}
            </div>
        </div>
    );
};

export default MyClaims;
