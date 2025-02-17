import React from "react";
import { motion } from "framer-motion";

const PreLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
      >
        {/* Outer glowing ring */}
        <motion.div
          className="absolute h-40 w-40 rounded-full border-8 border-[#00ffcc] border-opacity-40 shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />

        {/* Core spinning disk */}
        <motion.div
          className="h-28 w-28 rounded-full border-[10px] border-[#00ffcc] border-opacity-80"
          animate={{ rotate: [-180, 180] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />

        {/* Inner pulsating core */}
        <motion.div
          className="absolute h-10 w-10 rounded-full bg-[#00ffcc] shadow-2xl"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
};

export default PreLoader;
