import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { getFlowPayContract } from "../hooks/useContract";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import { motion } from "framer-motion";

export default function BatchPayment(){
  const { signer, account } = useWallet();
  const [recipientsStr, setRecipientsStr] = useState("");
  const [amountsStr, setAmountsStr] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const onBatch = async () => {
    try {
      if(!signer) throw new Error("Connect wallet");
      setStatus("Preparing batch...");
      const flow = getFlowPayContract(signer);

      const recipients = recipientsStr.split(",").map(s => s.trim()).filter(Boolean);
      const amounts = amountsStr.split(",").map(a => ethers.parseUnits(a.trim(), 18));
      const total = amounts.reduce((acc, a) => acc + a, 0n);

      // approve total
      const tokenAbi = ["function approve(address,uint256) returns (bool)","function allowance(address,address) view returns (uint256)"];
      const tokenContract = new ethers.Contract(token, tokenAbi, signer);
      const allow = await tokenContract.allowance(account, flow.address);
      if (allow < total) {
        setStatus("Approving total...");
        const tx = await tokenContract.approve(flow.address, total);
        await tx.wait();
      }

      setStatus("Sending batch...");
      const tx2 = await flow.batchPayment(recipients, amounts, token);
      await tx2.wait();
      setStatus("Batch successful ✅");
    } catch (err) {
      console.error(err);
      setStatus(err?.reason || err?.message || String(err));
    }
  };

  return (
    <motion.div className="bg-[#071026] rounded-xl p-6 shadow-lg border border-[#11121a]" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}}>
      <h2 className="text-xl font-semibold mb-4">Batch Payment</h2>

      <div className="space-y-3">
        <Input label="Recipients (comma separated)" placeholder="0x...,0x..." value={recipientsStr} onChange={e=>setRecipientsStr(e.target.value)} />
        <Input label="Amounts (comma separated)" placeholder="1,2,3" value={amountsStr} onChange={e=>setAmountsStr(e.target.value)} />
        <Input label="Token address" placeholder="0x..." value={token} onChange={e=>setToken(e.target.value)} />
        <div className="flex items-center gap-3">
          <Button onClick={onBatch} purple={true}>Run Batch</Button>
          <div className="text-sm text-slate-400">{status}</div>
        </div>
      </div>
    </motion.div>
  );
}
