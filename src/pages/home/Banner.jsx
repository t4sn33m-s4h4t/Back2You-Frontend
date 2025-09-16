import { motion } from "framer-motion";
import bannerImg from "../../assets/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="bg-gray-100 py-16">
            <div className="px-6  flex flex-col md:flex-row items-center justify-between">

                {/* Left Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6 }} 
                    className="text-center md:text-left max-w-lg"
                >
                    <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 text-transparent bg-clip-text">
                            Lost Something?
                        </span>
                        <br /> Find it or Report it Here!
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        A secure and user-friendly platform to help you recover lost belongings efficiently.
                    </p>

                    {/* Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.2, duration: 0.5 }} 
                        className="mt-6 flex gap-4 justify-center md:justify-start"
                    >
                        <button className="bg-[#1a237e] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 transform hover:scale-105">
                            
                            <Link to="/posts">🔍 View All Items</Link>
                        </button>
                        <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105">
                            <Link to="/addPost">➕ Add Item</Link>
                        </button>
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.6 }}
                    className="mt-10 md:mt-0"
                >
                    <img
                        src={bannerImg}
                        alt="Lost and Found"
                        className="rounded-lg shadow-xl w-full max-w-sm md:max-w-md transform hover:scale-105 transition-all duration-300"
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
