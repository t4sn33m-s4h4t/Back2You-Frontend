import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";

const AllPosts = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // State for filters
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const categories = ["All", "Mobile", "Laptop", "Electronics", "Jewelry", "Documents", "Others"];
    const postTypes = ["All", "Lost", "Found", "Item-Recovered"];

    const { data: posts = [], refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/posts");
            return res.data;
        },
    });

    // Filter posts based on category
    const filteredByCategory = selectedCategory === "All"
        ? posts
        : posts.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());

    // Filter posts based on post type
    const filteredByType = selectedType === "All"
        ? filteredByCategory
        : filteredByCategory.filter(post => post.type.toLowerCase() === selectedType.toLowerCase());

    // Filter posts based on search term
    const finalFilteredPosts = searchTerm
        ? filteredByType.filter(post => post.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : filteredByType;

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-12 px-4">

                {/* Search Bar */}
                <div className="mb-6 flex justify-center items-center">
                    <input
                        type="text"
                        placeholder="🔍 Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3 p-3 bg-white rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Filter Section */}
                <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 mb-8 items-center">
                    {/* Category Filter */}
                    <div className="relative">
                        <label className="text-gray-700 font-medium mb-2 block"> Select Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full p-3 pr-10 bg-white rounded-lg border border-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            {categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                       <span className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400">▼</span>
                    </div>

                    {/* Post Type Filter */}
                    <div className="relative">
                        <label className="text-gray-700 font-medium mb-2 block"> Select Post Type</label>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="w-full p-3 pr-10 bg-white rounded-lg border border-gray-400 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                        >
                            {postTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <span className="absolute right-3 top-14 transform -translate-y-1/2 text-gray-400">▼</span>
                    </div>
                </div>


                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {finalFilteredPosts.length > 0 ? (
                        finalFilteredPosts.map(post => (
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
                                                <button className="mt-5 w-full bg-[#1a237e] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                                                    View Details
                                                </button>
                                            </Link>
                                        ) : (
                                            <div className="flex justify-between items-center gap-3 mt-5">
                                                <Link to={`/posts/${post._id}`}>
                                                    <button className="bg-[#1a237e] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                                                        View Details
                                                    </button>
                                                </Link>

                                                {
                                                    post.type === "item-recovered" ? (
                                                        <button disabled className="bg-green-200 hover:bg-green-300 text-green-600 font-semibold py-2 px-4 rounded-lg transition">
                                                            Claim Item
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => navigate('/claim-item', { state: { post } })}
                                                            className="bg-green-200 hover:bg-green-300 text-green-600 font-semibold py-2 px-4 rounded-lg transition"
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
                    ) : (
                        <p className="text-gray-600 text-center col-span-3 text-lg">No items found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllPosts;
