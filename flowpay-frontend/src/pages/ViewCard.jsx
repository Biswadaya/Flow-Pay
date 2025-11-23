import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlowPayContract } from "../hooks/useContract";
import { useWallet } from "../context/WalletContext";
import { motion } from "framer-motion";

export default function ViewCard(){
  const { id } = useParams();
  const { provider } = useWallet();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    (async ()=>{
      if(!provider) return;
      try {
        const flow = getFlowPayContract(provider);
        const res = await flow.getGiftcard(BigInt(id));
        setCard(res);
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  },[id, provider]);

  if(loading) return <div className="bg-[#071026] rounded-xl p-6">Loading...</div>;
  if(!card) return <div className="bg-[#071026] rounded-xl p-6">Not found</div>;

  return (
    <motion.div className="bg-[#071026] rounded-xl p-6 shadow-lg border border-[#11121a]" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
      <h2 className="text-xl font-semibold mb-3">Giftcard #{id}</h2>
      <div className="text-sm text-slate-200 space-y-2">
        <div><strong>Creator:</strong> {card[0]}</div>
        <div><strong>Token:</strong> {card[1]}</div>
        <div><strong>Amount:</strong> {String(card[2])}</div>
        <div><strong>Claimer:</strong> {card[3]}</div>
        <div><strong>Claimed:</strong> {String(card[4])}</div>
      </div>
    </motion.div>
  );
}
