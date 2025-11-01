// src/components/AnimatedPage.jsx

import { motion } from "framer-motion";

// ആനിമേഷൻ ട്രാൻസിഷൻ
const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.7, // കൂടുതൽ സ്മൂത്ത് ആക്കാൻ ഡ്യൂറേഷൻ അല്പം കൂട്ടി
};

// "വാതിൽ" (Door) വേരിയന്റുകൾ
// മധ്യത്തിൽ നിന്ന് പുറത്തേക്ക് സ്ലൈഡ് ചെയ്യുന്നു
const doorVariants = {
  initial: {
    scaleX: 1, // 100% വീതി, കാഴ്ചയിൽ പേജ് പൂർണ്ണമായും മറയ്ക്കുന്നു
  },
  animate: {
    scaleX: 0, // 0% വീതി, വാതിൽ പൂർണ്ണമായും തുറക്കുന്നു
    transition: {
      ...pageTransition,
      // പുറത്തേക്ക് പോകുമ്പോൾ (exit) ഉള്ള ലേ ഔട്ട് ഷിഫ്റ്റ് ഒഴിവാക്കാൻ
      delay: 0.1, 
    },
  },
  exit: {
    scaleX: 1, // 100% വീതി, അടുത്ത പേജിലേക്ക് പോകുമ്പോൾ വാതിൽ അടയുന്നു
    transition: {
      ...pageTransition,
      // പുറത്തേക്ക് പോകുമ്പോൾ ആദ്യം വാതിൽ അടയട്ടെ
      delay: 0, 
    },
  },
};

const AnimatedPage = ({ children }) => {
  return (
    <>
      {/* ഇരട്ട വാതിലുകൾ പോലെ പ്രവർത്തിക്കുന്ന രണ്ട് motion.div-കൾ
        വാതിൽ പോലെ മധ്യത്തിൽ നിന്ന് പുറത്തേക്ക് തുറക്കാനായി
        'originX' 0 (ഇടത് വാതിലിന്) ഉം 1 (വലത് വാതിലിന്) ഉം ആയി സെറ്റ് ചെയ്യുന്നു.
      */}

      {/* ഇടത് വാതിൽ */}
      <motion.div
        className="slide-in" // CSS സ്റ്റൈലിങ്ങിനായി ഒരു ക്ലാസ് നൽകാം
        variants={doorVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "50%", // മൊത്തം വീതിയുടെ പകുതി
          height: "100vh",
          background: "#000000", // വാതിലിന്റെ നിറം, ആവശ്യമെങ്കിൽ മാറ്റാം
          zIndex: 999, // മറ്റെല്ലാ കമ്പോണന്റുകൾക്കും മുകളിൽ വരാൻ
          transformOrigin: "left", // ഇടത് വശം ആങ്കറായി വെച്ച് വലത്തേക്ക് സ്ലൈഡ് ചെയ്യുന്നു
        }}
      />
      
      {/* വലത് വാതിൽ */}
      <motion.div
        className="slide-out" // CSS സ്റ്റൈലിങ്ങിനായി ഒരു ക്ലാസ് നൽകാം
        variants={doorVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: "50%", // മൊത്തം വീതിയുടെ പകുതി
          height: "100vh",
          background: "#000000", // വാതിലിന്റെ നിറം
          zIndex: 999,
          transformOrigin: "right", // വലത് വശം ആങ്കറായി വെച്ച് ഇടത്തേക്ക് സ്ലൈഡ് ചെയ്യുന്നു
        }}
      />
      
      {/* യഥാർത്ഥ പേജ് കണ്ടന്റ് */}
      <main style={{ position: "relative" }}>
        {children}
      </main>
    </>
  );
};

export default AnimatedPage;