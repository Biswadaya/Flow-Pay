import React from "react";
import { Link, useNavigate } from "react-router-dom";
import WalletButton from "./WalletButton";
import { motion } from "framer-motion";

export default function Navbar(){
  const nav = useNavigate();

  return (
    <motion.header className="w-full border-b border-[#121226] bg-gradient-to-b from-[#05060a]/60 to-transparent backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => nav('/')}>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6e55ff] to-[#4b2bff] flex items-center justify-center text-white font-bold shadow-lg">FP</div>
          <div className="text-lg font-semibold">FlowPay</div>
        </div>

        <nav className="hidden md:flex gap-4 ml-6">
          <Link to="/services" className="text-sm text-slate-400 hover:text-slate-100">Services</Link>
          <Link to="/about" className="text-sm text-slate-400 hover:text-slate-100">About</Link>
          <Link to="/contact" className="text-sm text-slate-400 hover:text-slate-100">Contact</Link>
        </nav>

        <div className="ml-auto">
          <WalletButton />
        </div>
      </div>
    </motion.header>
  );
}
