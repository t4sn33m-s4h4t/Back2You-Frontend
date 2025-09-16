import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How can I post a lost item?",
      answer:
        "Log in to your account and go to the 'Lost Item Add' option, then submit the necessary information.",
    },
    {
      question: "How can I contact the owner of an item?",
      answer:
        "Go to the Lost Item Details page and use the chat option to communicate.",
    },
    {
      question: "How does the trust score work?",
      answer:
        "The trust score is determined based on user activity and feedback.",
    },
    {
      question: "How can I use the chat feature?",
      answer:
        "Log in and go to the specific lost or found item page to access the chat option.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 my-12 py-8">
       <div className="w-11/12 lg:w-6/12 mx-auto my-12 p-8 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-4xl font-bold text-center mb-5 text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 text-center mb-8 text-lg">
        Find quick answers to common questions about lost items, contacting
        owners, trust scores, and chat features.
      </p>
      <div className="space-y-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-xl shadow-sm transition-all hover:shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 font-medium text-lg flex justify-between items-center focus:outline-none hover:bg-gray-100 rounded-xl"
              aria-expanded={openIndex === index}
            >
              <span className="text-gray-900">{faq.question}</span>
              <span className="text-2xl text-gray-700">
                {openIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-5 text-gray-700 bg-gray-50 rounded-b-xl border-t border-gray-200">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default FAQSection;
