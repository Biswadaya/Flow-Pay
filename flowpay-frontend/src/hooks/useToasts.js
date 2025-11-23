import { useState } from "react";

export function useToasts(){
  const [toasts, setToasts] = useState([]);
  const push = (t) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(s=>[...s, { id, ...t }]);
    setTimeout(()=> setToasts(s=>s.filter(x=>x.id!==id)), 9000);
  };
  const remove = (id) => setToasts(s=>s.filter(x=>x.id!==id));
  return { toasts, push, remove };
}
