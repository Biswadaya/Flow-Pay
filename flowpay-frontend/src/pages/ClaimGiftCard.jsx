import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { getFlowPayContract } from "../hooks/useContract";
import { useWallet } from "../context/WalletContext";
import { motion } from "framer-motion";

export default function ClaimGiftCard(){
  const { signer, account } = useWallet();
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState("");

  const claim = async () => {
    try {
      if(!signer) throw new Error("Connect wallet");
      setStatus("Claiming...");
      const flow = getFlowPayContract(signer);
      const tx = await flow.claimGiftcard(secret, account);
      await tx.wait();
      setStatus("Claim successful ✅");
    } catch (err) {
      console.error(err);
      setStatus(err?.reason || err?.message || String(err));
    }
  };

  return (
    <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-[#071026] rounded-xl p-6 shadow-lg border border-[#11121a]">
      <h2 className="text-xl font-semibold mb-4">Claim Giftcard</h2>
      <div className="space-y-3">
        <Input label="Secret code" placeholder="Type your code" value={secret} onChange={e=>setSecret(e.target.value)} />
        <div className="flex items-center gap-3">
          <Button onClick={claim} purple={true}>Claim</Button>
          <div className="text-sm text-slate-400">{status}</div>
        </div>
      </div>
    </motion.div>
  );
}
