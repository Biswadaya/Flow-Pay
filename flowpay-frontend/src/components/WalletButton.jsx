import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { motion } from "framer-motion";

export default function WalletButton(){
  const { account, connect, balance } = useWallet();
  const [loading, setLoading] = useState(false);

  const onConnect = async () => {
    try {
      setLoading(true);
      await connect();
    } catch (err) {
      alert(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  if(!account){
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onConnect}
        className="px-4 py-2 rounded-md bg-gradient-to-br from-[#6e55ff] to-[#4b2bff] hover:from-[#5b48ff] text-white text-sm font-semibold shadow"
      >
        {loading ? "Connecting..." : "Connect Wallet"}
      </motion.button>
    );
  }

  const short = `${account.slice(0,6)}...${account.slice(-4)}`;
  const ethBal = balance ? (Number(balance) / 1e18).toFixed(4) : "";

  return (
    <div className="flex items-center gap-3 bg-[#0b0f1b] px-3 py-1 rounded-md border border-[#11121a]">
      <div className="text-sm">{short}</div>
      <div className="text-xs text-slate-400">{ethBal} ETH</div>
    </div>
  );
}
