import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FaReceipt, FaImage, FaInfoCircle, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import LoadingSpinner from '../../components/LoadingSpinner.jsx'; 

const ClaimDetails = () => {

    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: claim, isLoading } = useQuery({
        queryKey: ['claim', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/claims/${id}`);
            return res.data;
        }
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return <span className="badge badge-warning gap-1"><FaClock /> Pending</span>;
            case 'verified':
                return <span className="badge badge-success gap-1"><FaCheckCircle /> Verified</span>;
            case 'rejected':
                return <span className="badge badge-error gap-1"><FaTimesCircle /> Rejected</span>;
            default:
                return <span className="badge badge-info gap-1">Unknown</span>;
        }
    };

    if (isLoading) return <LoadingSpinner />;
    if (!claim) return <div className="text-center py-12">Claim not found</div>;
    console.log(claim)
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-3xl text-center font-bold mb-6">Claim Details</h1>

                <div className="mb-8 p-4 bg-gray-100 rounded-lg border border-gray-300">
                    <h2 className="text-lg font-semibold mb-3">Claim Information</h2>
                    <div className="space-y-2">
                        {
                            // !user.role!=='admin' && <p><span className="font-medium">Claim ID:</span> {claim?._id}</p>
                        }
                        <p><span className="font-medium">Status:</span> {getStatusBadge(claim?.status)}</p>
                        <p><span className="font-medium">Date Submitted:</span> {new Date(claim?.createdAt).toLocaleString()}</p>
                        {claim?.updatedAt && (
                            <p><span className="font-medium">Last Updated:</span> {new Date(claim?.updatedAt).toLocaleString()}</p>
                        )}
                    </div>
                </div>

                <div className="mb-8 p-4 bg-blue-100 rounded-lg border border-blue-300">
                    <h2 className="text-lg font-semibold mb-3">Item Information</h2>
                    <div className="space-y-2">
                        <p><span className="font-medium">Item Name:</span> {claim?.postDetails?.name}</p>
                        <p><span className="font-medium">Category:</span> {claim?.postDetails?.category}</p>
                        <p><span className="font-medium">Location:</span> {claim?.postDetails?.location}</p>
                        <p><span className="font-medium">Posted by:</span> {claim?.postAuthor}</p>
                    </div>
                </div>

                <div className="mb-8 p-4 bg-cyan-100 rounded-lg border border-cyan-300">
                    <h2 className="text-lg font-semibold mb-2">Claimant Information</h2>
                    <div>
                        <p><span className="font-medium">Name:</span> {claim?.claimantName}</p>
                        <p><span className="font-medium">Email:</span> {claim?.claimantEmail}</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Evidence</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-medium mb-2 flex items-center gap-1">
                                <FaReceipt className="text-blue-500" /> Receipt
                            </h3>
                            {claim?.receiptUrl ? (
                                <a
                                    href={claim?.receiptUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <img
                                        src={claim?.receiptUrl}
                                        alt="Receipt"
                                        className="max-w-full h-auto border border-blue-400 rounded"
                                    />
                                </a>
                            ) : (
                                <p className="text-gray-500">No receipt provided</p>
                            )}
                        </div>
                        <div>
                            <h3 className="font-medium mb-2 flex items-center gap-1">
                                <FaImage className="text-green-500" /> Additional Image
                            </h3>
                            {claim?.imageUrl ? (
                                <a
                                    href={claim?.imageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    <img
                                        src={claim?.imageUrl}
                                        alt="Item"
                                        className="max-w-full h-auto border border-blue-400 rounded"
                                    />
                                </a>
                            ) : (
                                <p className="text-gray-500">No additional image provided</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2 flex items-center gap-1">
                        <FaInfoCircle className="text-purple-500" /> Claim Details
                    </h2>
                    <div className="bg-gray-50 p-4 rounded border break-words">
                        <p className="whitespace-pre-line">{claim?.details}</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ClaimDetails;
