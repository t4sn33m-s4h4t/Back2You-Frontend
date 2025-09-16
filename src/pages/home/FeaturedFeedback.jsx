import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { EffectCoverflow, Pagination } from "swiper/modules";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: featuredFeedbacks = [] } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/feedbacks");
      return res.data;
    },
  });

  return (
    <div className="w-full max-w-6xl mx-auto py-12 my-12 px-4 bg-gradient-to-r from-blue-50 to-white rounded-xl shadow-xl">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-[#19277b] mb-10">
        💬 What Our Users Are Saying
      </h2>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="w-11/12 mx-auto lg:w-full"
      >
        {featuredFeedbacks.map((feedback) => (
          <SwiperSlide
            key={feedback._id}
            className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-2xl transition-all duration-300 max-w-md"
          >
            <div className="flex flex-col items-center h-80 justify-between text-center">
              <img
                src={feedback.photo}
                alt={feedback.name}
                className="w-16 h-16 rounded-full border-2 border-blue-400 shadow-lg mb-2"
              />
              <div className="flex justify-center">
                {[...Array(5)].map((_, index) =>
                  index < feedback.rating ? (
                    <FaStar key={index} className="text-yellow-500 mr-1" />
                  ) : (
                    <FaRegStar key={index} className="text-gray-300 mr-1" />
                  )
                )}
              </div>
              <p className="text-gray-700 italic mt-2 px-2">
                “{feedback.feedback}”
              </p>
              <div className="mt-4 w-full">
                <p className="text-[#19277b] font-semibold">{feedback.name}</p>
                <p className="text-sm text-gray-500">{feedback.date}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-8 text-center">
        <Link
          to="/feedbacks"
          className="inline-block bg-[#19277b] hover:bg-[#0f1b5f] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-105 duration-300"
        >
          View All Feedbacks
        </Link>
      </div>
    </div>
  );
};

export default Reviews;
