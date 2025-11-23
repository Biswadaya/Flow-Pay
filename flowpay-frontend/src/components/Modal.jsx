import React from "react";
import { motion } from "framer-motion";

export default function Modal({ open, onClose, children, title }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/60" />
      <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} className="relative bg-surface rounded-md p-6 w-full max-w-xl">
        {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
        {children}
      </motion.div>
    </div>
  );
}
