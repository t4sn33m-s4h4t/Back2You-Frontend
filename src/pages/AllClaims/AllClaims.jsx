import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaReceipt, FaImage, FaInfoCircle, FaClock, FaCheckCircle, FaTimesCircle, FaFilter, FaComments } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AllClaims = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('all');

    const { data: claims = [], isLoading, refetch } = useQuery({
        queryKey: ['claims', statusFilter],
        queryFn: async () => {
            const res = await axiosPublic.get(`/claims`);
            return res.data;
        }
    });
    const filteredClaims = statusFilter === 'all'
        ? claims
        : claims.filter(claim => claim.status === statusFilter);


    const handleStatusUpdate = async (claimId, newStatus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to change this claim's status to ${newStatus}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1a237e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosPublic.patch(`/claims/${claimId}/status`, { status: newStatus });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire(
                            'Updated!',
                            `Claim status has been set to ${newStatus}.`,
                            'success'
                        );
                        refetch();
                    }
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'There was an error updating the status.',
                        'error'
                    );
                }
            }
        });
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-gray-100 py-12">
            <div className="container mx-auto p-6 max-w-6xl bg-white rounded-xl shadow-lg">
                <div className="bg-indigo-900 py-4 px-6 flex justify-between items-center rounded-t-xl">
                    <div className="">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">
                            All Claims
                        </h1>
                        <p className="text-indigo-200 text-center mt-1">
                            Here you can manage all claims. You can update or delete them as needed.
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-white" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="select select-bordered select-sm"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="verified">Verified</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {filteredClaims.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-lg">
                        <h2 className="text-xl font-medium mb-4">No claims found</h2>
                        {statusFilter !== 'all' && (
                            <button
                                onClick={() => setStatusFilter('all')}
                                className="btn btn-sm btn-outline"
                            >
                                Clear filters
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-b-lg shadow overflow-hidden">
                        <div className="overflow-x-auto bg-white">
                            <table className="table table-zebra w-full">
                                <thead className="bg-indigo-600 text-white text-base">
                                    <tr>
                                        <th>Claim Info</th>
                                        <th>Evidence</th>
                                        <th>Status</th>
                                        <th>Review</th>
                                        <th>Chat (Claimant)</th>
                                        <th>Chat (Receiver)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredClaims.map((claim) => (
                                        <tr key={claim._id} className="hover:bg-indigo-50 transition-all">
                                            {/* Claim Info */}
                                            <td>
                                                <div className="flex items-center gap-4">
                                                    <div className="avatar">
                                                        <div className="w-12 h-12 rounded-full ring ring-indigo-300">
                                                            {claim.imageUrl ? (
                                                                <img src={claim.imageUrl} alt="Claim" />
                                                            ) : (
                                                                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500 font-bold">
                                                                    ?
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">Claim #{claim._id.slice(-6)}</p>
                                                        <p className="text-xs text-gray-500">{new Date(claim.createdAt).toLocaleDateString()}</p>
                                                        <p className="text-sm mt-1 text-gray-600">
                                                            Claimant: <span className="font-medium">{claim.claimantName}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Evidence */}
                                            <td>
                                                <div className="flex flex-col gap-1 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <FaReceipt className="text-blue-500" />
                                                        <span className={`${claim.receiptUrl ? 'text-green-700' : 'text-red-500'}`}>
                                                            {claim.receiptUrl ? 'Receipt attached' : 'No receipt'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <FaImage className="text-green-500" />
                                                        <span className={`${claim.imageUrl ? 'text-green-700' : 'text-red-500'}`}>
                                                            {claim.imageUrl ? 'Image provided' : 'No image'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td>
                                                <select
                                                    value={claim.status}
                                                    onChange={(e) => handleStatusUpdate(claim._id, e.target.value)}
                                                    className={`select select-sm select-bordered ${claim.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : claim.status === 'verified'
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="verified">Verified</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            </td>

                                            {/* Review Button */}
                                            <td>
                                                <Link
                                                    to={`/claim-details/${claim._id}`}
                                                    className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white"
                                                >
                                                    Review
                                                </Link>
                                            </td>

                                            {/* Chat - Claimant */}
                                            <td>
                                                {claim.status === 'verified' ? (
                                                    <Link
                                                        to={`/chats/${claim?.claimantEmail}`}
                                                        className="btn btn-sm btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-100 w-full"
                                                    >
                                                        <FaComments className="text-indigo-600" /> Chat
                                                    </Link>
                                                ) : (
                                                    <div
                                                        className="btn btn-sm btn-disabled cursor-not-allowed w-full"
                                                        title="Chat not available until verified"
                                                    >
                                                        <FaTimesCircle /> No Chat
                                                    </div>
                                                )}
                                            </td>

                                            {/* Chat - Receiver */}
                                            <td>
                                                {claim.status === 'verified' ? (
                                                    <Link
                                                        to={`/chats/${claim?.postAuthor}`}
                                                        className="btn btn-sm btn-outline border-indigo-600 text-indigo-600 hover:bg-indigo-100 w-full"
                                                    >
                                                        <FaComments className="text-indigo-600" /> Chat
                                                    </Link>
                                                ) : (
                                                    <div
                                                        className="btn btn-sm btn-disabled cursor-not-allowed w-full"
                                                        title="Chat not available until verified"
                                                    >
                                                        <FaTimesCircle /> No Chat
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default AllClaims;
