import React from "react";
import { FaShieldAlt, FaStar, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ChooseUs = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12 text-center">
    <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-gray-900">Why Choose Us?</h2>
      <p className="mt-3 text-gray-600 text-lg max-w-lg mx-auto">
        We make the lost and found process simpler, safer, and more effective
        with a trusted community and secure platform.
      </p>

      <div className="mt-12 py-5 grid gap-8 md:grid-cols-3 mx-4 lg:mx-0">
        {[
          {
            icon: (
              <FaShieldAlt className="text-red-500 text-6xl mx-auto transition-transform duration-300 group-hover:scale-110" />
            ),
            title: "Secure & Reliable",
            description:
              "Advanced security ensures your data is always protected.",
          },
          {
            icon: (
              <FaUsers className="text-purple-500 text-6xl mx-auto transition-transform duration-300 group-hover:scale-110" />
            ),
            title: "Community Driven",
            description: "Join a trusted network of people helping each other.",
          },
          {
            icon: (
              <FaStar className="text-orange-500 text-6xl mx-auto transition-transform duration-300 group-hover:scale-110" />
            ),
            title: "Proven Success",
            description:
              "Thousands of lost items successfully returned every year.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 shadow-lg rounded-xl text-center group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mt-5">{feature.title}</h3>
            <p className="text-gray-500 mt-3">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <motion.button
          className="bg-[#1a237e] hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link to="/addPost">Report a Lost Item</Link>
        </motion.button>
      </div>
    </div>
    </div>
  );
};

export default ChooseUs;
