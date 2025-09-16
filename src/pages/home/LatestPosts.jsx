import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";

const LatestPosts = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { data: latestPosts = [], refetch } = useQuery({
        queryKey: ["latestPosts"],
        queryFn: async () => {
            const res = await axiosPublic.get('/posts/latest/topSix');
            return res.data;
        },
    });
    // console.log(latestPosts);

    return (
        <div className="py-12 bg-gradient-to-r from-blue-50 via-white to-blue-50 my-12">
            <div className="container mx-auto">
                <h1 className="text-3xl lg:text-5xl font-bold text-center text-gray-900 mb-8">Latest Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-4 lg:mx-0">
                    {
                        latestPosts.map(post => (
                            <div
                                key={post._id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300"
                            >
                                <img
                                    src={post.image}
                                    alt={post.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    <h2 className="text-lg font-semibold text-gray-900">{post.name}</h2>
                                    <p className="text-sm text-gray-600 mt-1">📌 {post.category}</p>
                                    <p className="text-sm text-gray-600 mt-1">📍 {post.location}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-sm text-gray-500">📅 {new Date(post.timestamp).toLocaleDateString()}</p>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${post.type === 'lost' ? 'bg-red-100 text-red-600' : post.type === 'found' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                            }`}>
                                            {post.type}
                                        </span>
                                    </div>

                                    {
                                        post.type === 'lost' ? (
                                            <Link to={`/posts/${post._id}`}>
                                                <button
                                                    className="mt-5 w-full bg-[#1a237e] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transitio"
                                                >
                                                    View Details
                                                </button>
                                            </Link>
                                        ) : (
                                            <div className="flex justify-between items-center gap-3 mt-5">
                                                <Link to={`/posts/${post._id}`}>
                                                    <button
                                                        className="bg-[#1a237e] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transitio"
                                                    >
                                                        View Details
                                                    </button>
                                                </Link>
                                                
                                                {
                                                    post.type === "item-recovered" ? (
                                                        <button disabled
                                                            className="btn bg-green-200 hover:bg-green-300 text-green-600 hover:text-green-700 font-semibold py-2 px-4 rounded-lg transitio"
                                                        >
                                                            Claim Item
                                                        </button>
                                                    ) : (
                                                        <button
                                                        onClick={() => navigate('/claim-item', { state: { post } })}
                                                            className=" bg-green-200 hover:bg-green-300 text-green-600 hover:text-green-700 font-semibold py-2 px-4 rounded-lg transitio"
                                                        >
                                                            Claim Item
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default LatestPosts;