import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { getFlowPayContract } from "../hooks/useContract";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import { motion } from "framer-motion";

export default function CreateGiftCard(){
  const { signer, account } = useWallet();
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("1");
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    try {
      if(!signer) throw new Error("Connect wallet");
      setLoading(true);
      setStatus("Checking token and allowance...");

      const flow = getFlowPayContract(signer);
      // compute parsed amount with 18 decimals
      const parsed = ethers.parseUnits(amount, 18);
      const codeHash = ethers.keccak256(ethers.toUtf8Bytes(secret));

      // ERC20 approve flow
      const tokenAbi = [
        "function approve(address spender, uint256 amount) returns (bool)",
        "function allowance(address owner, address spender) view returns (uint256)",
        "function decimals() view returns (uint8)"
      ];
      const tokenContract = new ethers.Contract(token, tokenAbi, signer);
      const allow = await tokenContract.allowance(account, flow.address);

      if (allow < parsed) {
        setStatus("Approving tokens...");
        const tx = await tokenContract.approve(flow.address, parsed);
        await tx.wait();
      }

      setStatus("Creating giftcard...");
      const tx2 = await flow.createGiftcard(token, parsed, codeHash);
      await tx2.wait();
      setStatus("Giftcard created ✅. Save your secret code to claim.");
    } catch (err) {
      console.error(err);
      setStatus(err?.reason || err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} className="bg-[#071026] rounded-xl p-6 shadow-lg border border-[#11121a]">
      <h2 className="text-xl font-semibold mb-4">Create Giftcard</h2>

      <div className="space-y-4">
        <Input label="Token address" placeholder="0x..." value={token} onChange={e=>setToken(e.target.value)} />
        <Input label="Amount (tokens)" placeholder="100" value={amount} onChange={e=>setAmount(e.target.value)} />
        <Input label="Secret code (visible to you)" placeholder="e.g. HACK2025" value={secret} onChange={e=>setSecret(e.target.value)} help="Only the hash is stored on-chain. Keep this secret!" />

        <div className="flex items-center gap-3">
          <Button onClick={onCreate} purple={true} className="inline-flex items-center" >
            {loading ? "Working..." : "Create Giftcard"}
          </Button>
          <div className="text-sm text-slate-400">{status}</div>
        </div>
      </div>
    </motion.div>
  );
}
