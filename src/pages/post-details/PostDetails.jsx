import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const PostDetails = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: post = {}, refetch } = useQuery({
        queryKey: ["post", id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/posts/${id}`);
            return res.data;
        },
    });

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto py-12 px-4">
                <div className="bg-white shadow-lg rounded-xl p-6 md:flex gap-8">
                    {/* Image Section */}
                    <img
                        src={post.image}
                        alt={post.name}
                        className="w-full md:w-1/2 rounded-lg object-cover"
                    />

                    {/* Details Section */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900">{post.name}</h1>
                        <p className="text-gray-600 mt-2">📌 <strong>Category:</strong> {post.category}</p>
                        <p className="text-gray-600">📍 <strong>Location:</strong> {post.location}</p>
                        <p className="text-gray-600">📞 <strong>Contact:</strong> {post.phone}</p>
                        <p className="text-gray-700 mt-4">{post.description}</p>
                        <p className="text-gray-500 text-sm mt-2">📅 Posted on: {new Date(post.timestamp).toLocaleDateString()}</p>

                        {/* Owner Details */}
                        <div className="flex items-center gap-4 mt-6 p-4 bg-gray-200 rounded-lg">
                            <img src={post.ownerImage} alt="Owner" className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="text-lg font-semibold">{post.ownerName}</p>
                                <p className="text-sm text-gray-500">{post.ownerEmail}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 font-medium py-2 rounded-lg"
                            >
                                Go Back
                            </button>


                            {
                                post.type === "item-recovered" ? (
                                    <button disabled
                                        onClick={() => {
                                            if (user?.email === post.ownerEmail) {
                                                toast.error("You cannot claim your own item!");
                                            } else {
                                                navigate('/claim-item', { state: { post } })
                                            }
                                        }}
                                        className="btn bg-green-200 hover:bg-green-300 text-green-600 px-4 py-2 rounded-lg font-medium"
                                    >
                                        Claim Item
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            if (user?.email === post.ownerEmail) {
                                                toast.error("You cannot claim your own item!");
                                            } else {
                                                navigate('/claim-item', { state: { post } })
                                            }
                                        }}
                                        className="bg-green-200 hover:bg-green-300 text-green-600 px-4 py-2 rounded-lg font-medium"
                                    >
                                        Claim Item
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PostDetails;
