import React from "react";
import Marquee from "react-fast-marquee";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const Marque = () => {
    const axiosPublic = useAxiosPublic();

    const { data: posts = [] } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
            const res = await axiosPublic.get("/posts");
            return res.data;
        },
    });

    return (
        <div className="py-12 px-6 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-xl shadow-2xl">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
                    🔍 Lost something? Browse recent posts here!
                </h2>
                <Marquee pauseOnHover={true} speed={60} gradient={true} gradientWidth={100}>
                    {posts.map((post) => (
                        <Link
                            to={`/posts/${post._id}`}
                            key={post._id}
                            className="mx-5 flex items-center bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-transform transform hover:scale-105 w-[400px] h-[200px] p-6"
                        >
                            <img
                                src={post.image}
                                alt={post.name}
                                className="w-30 h-30 rounded-xl object-cover mr-4 border border-gray-200"
                            />
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-gray-800">{post.name}</h3>
                                <p className="text-sm text-gray-600">
                                 {post.category} | {post.location}
                                </p>
                                <span
                                    className={`inline-block text-xs font-bold uppercase mt-1 px-3 py-1 rounded-full ${post.type === "lost"
                                            ? "bg-red-100 text-red-600"
                                            : post.type === "found"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-blue-100 text-blue-600"
                                        }`}
                                >
                                    {post.type}
                                </span>
                                <div>
                                    <Link
                                        to={`/posts/${post._id}`}
                                        className="mt-2 inline-block text-xs bg-blue-600 text-white font-semibold py-1.5 px-3 rounded-md hover:bg-blue-700 transition duration-200"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default Marque;
