
import { FaSearch, FaHandshake, FaCheckCircle, FaHeart } from 'react-icons/fa';
 
const About = () => {
 
  return (
    <div className="bg-gray-100 py-12 px-6 lg:px-0">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
            Helping You Find What Matters Most
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Back2You - The Lost & Found System is a web-based platform that enables
            users to report lost items, find returned belongings, verify ownership
            and connect with others to reclaim their items. Designed with trust,
            transparency and user experience in mind, this system also incorporates
            real-time communication, optional rewards and donation-based support.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            {
              icon: <FaSearch className="text-blue-500 text-6xl mx-auto" />,
              title: 'Search & Find',
              description: 'Use smart filters to search for lost items quickly and easily.',
            },
            {
              icon: <FaHandshake className="text-green-500 text-6xl mx-auto" />,
              title: 'Trust & Security',
              description: 'We ensure verified item recovery with a secure verification system.',
            },
            {
              icon: <FaCheckCircle className="text-yellow-500 text-6xl mx-auto" />,
              title: 'Easy Connection',
              description: 'Chat and connect with finders or owners securely within the platform.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-lg rounded-xl text-center transition-transform duration-300 hover:scale-105"
            >
              {item.icon}
              <h3 className="text-2xl font-semibold mt-5 text-gray-800">{item.title}</h3>
              <p className="text-gray-500 mt-3">{item.description}</p>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-16">
          <Link to="/report-lost-item">
            <button className="bg-[#1a237e] hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300shadow-md hover:shadow-lg">
              Report a Lost Item
            </button>
          </Link>
        </div> */}

      


      </div>
    </div>
  );
};

export default About;
