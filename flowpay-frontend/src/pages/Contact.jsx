import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  return (
    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="bg-[#071026] rounded-xl p-6 shadow-lg border border-[#11121a]">
      <h2 className="text-xl font-semibold mb-3">Contact</h2>
      <div className="space-y-3">
        <Input label="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <Input label="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <label className="block">
          <div className="text-sm text-slate-300 mb-1">Message</div>
          <textarea rows="4" className="w-full bg-[#0b0f14] border border-[#151826] rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#6e55ff]" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
        </label>
        <Button onClick={(e)=>{ e.preventDefault(); alert('Thanks! (demo)'); }} purple={true}>Send Message</Button>
      </div>
    </motion.div>
  );
}
