import React from "react";

export default function Input({ label, help, ...props }){
  return (
    <label className="block">
      {label && <div className="text-sm text-slate-300 mb-1">{label}</div>}
      <input {...props} className="w-full bg-[#0b0f14] border border-[#151826] rounded-md px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#6e55ff]" />
      {help && <div className="text-xs text-slate-400 mt-1">{help}</div>}
    </label>
  );
}
