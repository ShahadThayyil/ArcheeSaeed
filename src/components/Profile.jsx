import { motion } from "framer-motion";
import { FaBehance, FaDribbble, FaLinkedin, FaInstagram } from "react-icons/fa";
import ProfileCard from "./ProfileCard";

const Profile = ()=>{
   return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        
          <ProfileCard />
         
        {/* </motion.div> */}

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* Badge */}
          <span className="px-4 py-1 text-sm border border-gray-700 rounded-full inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            ABOUT ME
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover My <br /> Design Journey
          </h1>

          {/* Paragraph */}
          <p className="text-gray-400 text-base leading-relaxed">
            Hello! I’m Wilson Brock, a passionate Web Designer with over 5+ years
            of experience in creating visually appealing and user-friendly
            websites. My mission is to bring your brand to life through innovative
            design solutions tailored to your unique needs.
          </p>

          {/* Social Icons */}
          <div className="flex gap-5 pt-4">
            {[
              { icon: <FaBehance />, link: "#" },
              { icon: <FaDribbble />, link: "#" },
              { icon: <FaLinkedin />, link: "#" },
              { icon: <FaInstagram />, link: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-400 hover:text-black transition-colors text-xl"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;