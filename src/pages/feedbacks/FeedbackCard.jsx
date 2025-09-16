import {motion} from "framer-motion";
import { Star } from "lucide-react";
const FeedbackCard = ({ name, email, rating, feedback, date, photo }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex items-start space-x-4"
        >
            <img src={photo} alt={name} className="w-12 h-12 rounded-full object-cover border border-gray-300" />
            <div>
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-500">{email}</p>
                <p className="text-sm text-gray-500 mb-2">{date}</p>
                <div className="flex items-center mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className={i < rating ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                </div>
                <p className="text-gray-700">"{feedback}"</p>
            </div>
        </motion.div>
    );
};

export default FeedbackCard; 