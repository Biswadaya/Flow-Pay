import React from "react";
import { motion } from "framer-motion";

export default function Button({ children, onClick, purple=true, className='', ...props }){
  const base = "px-4 py-2 rounded-md font-semibold text-sm transition-all";
  const purpleStyle = "bg-gradient-to-br from-[#6e55ff] to-[#4b2bff] hover:from-[#5b48ff] text-white shadow";
  const greenStyle = "bg-[#22e58a] hover:bg-[#13c573] text-black shadow";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${base} ${purple ? purpleStyle : greenStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
