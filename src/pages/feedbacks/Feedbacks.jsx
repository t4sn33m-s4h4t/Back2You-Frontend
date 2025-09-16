import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import FeedbackCard from "./FeedbackCard";


const Feedbacks = () => {
    const axiosPublic = useAxiosPublic();
    const { data: feedbacks = [], refetch } = useQuery({
        queryKey: ["feedbacks"],
        queryFn: async () => {
            const res = await axiosPublic.get("/feedbacks");
            return res.data;
        },
    });
    return (
        <div className="container mx-auto my-12 px-4 lg:px-[100px]">
            <div className="bg-indigo-900 py-4 px-6 rounded-t-xl">
                <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                    User Feedbacks
                </h1>
                <p className="text-indigo-200 text-center mt-1">
                    Here are some feedbacks from our users. We value your opinion and strive to improve our services based on your suggestions.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mx-5 my-6 md:mx-0 lg:grid-cols-3 gap-6">
                {feedbacks.map((item, index) => (
                    <FeedbackCard key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Feedbacks;
