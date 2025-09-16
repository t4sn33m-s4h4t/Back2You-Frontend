import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import { motion } from "framer-motion";

const Contact = () => {
  const position = [23.8291753, 90.3887031];

  return (
    <div className="flex flex-col shadow-2xs bg-gray-100 text-gray-900 p-12 lg:px-[120px]  border border-gray-200">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="md:w-1/2 p-6 space-y-2"
        >
          <h1
            className="text-3xl md:text-5xl font-bold text-red-600"
          >
            Contact Us
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-lg text-gray-600"
          >
            Have inquiries or collaboration ideas? Get in touch with us!
          </motion.p>

          <div className="mt-4 space-y-2">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <FaEnvelope className="text-cyan-400 text-xl bg-cyan-800 btn btn-sm rounded-full w-12 h-12 md:w-14 md:h-14" />
              <span className="text-xl text-gray-800">
                Back2You@gmail.com
              </span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <FaWhatsapp className="text-green-400 text-xl bg-green-800 btn btn-sm rounded-full w-12 h-12 md:w-14 md:h-14" />
              <span className="text-lg md:text-xl text-gray-800">+880 160 953 1117</span>
            </motion.div>

            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <FaMapMarkerAlt className="text-red-400 text-xl bg-red-800 btn btn-sm rounded-full w-12 h-12 md:w-14 md:h-14" />
              <span className="text-lg md:text-xl text-gray-800">
                Cantonment, Dhaka, Bangladesh
              </span>
            </motion.div>
          </div>
        </motion.div>

        <div className="md:w-1/2 p-6 bg-white rounded-xl shadow-lg">
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <div>
              <label className="block text-gray-700 font-medium">
                Your Name
              </label>
              <motion.input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Your Email
              </label>
              <motion.input
                type="email"
                placeholder="example@mail.com"
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-cyan-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Your Message
              </label>
              <motion.textarea
                placeholder="Write your message here..."
                className="w-full p-3 mt-1 border rounded-lg focus:ring-2 focus:ring-cyan-400"
                rows="4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              ></motion.textarea>
            </div>

            <motion.button
              className="w-full bg-[#1a237e] hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>

      <div className="w-4/5 mx-auto mt-8 h-64 rounded-lg overflow-hidden">
        <MapContainer center={position} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>Our Office : Cantonment, Bangladesh</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Contact;
