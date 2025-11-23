import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastsContainer({ toasts, remove }){
  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id} initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}} className="bg-[#071127] border border-[#1b2a42] px-4 py-3 rounded-md shadow">
            <div className="flex items-start gap-3">
              <div className="text-sm">{t.title}</div>
              <div className="text-xs text-muted ml-3">{t.message}</div>
              <button onClick={() => remove(t.id)} className="ml-auto text-muted text-xs">Dismiss</button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
