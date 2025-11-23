import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useWallet } from "../context/WalletContext";

export default function Home(){
  const nav = useNavigate();
  const { account, connect } = useWallet();

  const start = async () => {
    if(!account){
      try {
        await connect();
      } catch (e) {
        alert(e.message || String(e));
        return;
      }
    }
    nav("/create");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section className="lg:col-span-2 bg-[#071026] rounded-xl p-8 shadow-lg border border-[#11121a]">
        <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
          <h1 className="text-4xl font-bold mb-3">FlowPay — Giftcards & Payroll</h1>
          <p className="text-slate-300 mb-6">Create redeemable on-chain giftcards, run batch payrolls, and demo seamless token flows — built on Arbitrum Stylus.</p>

          <div className="flex gap-3 items-center">
            <Button onClick={start} purple={true}>Get Started</Button>
            <Button onClick={() => nav('/services')} purple={false}>Explore Services</Button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md border border-[#11121a] hover:bg-[#08112a]">
              <h3 className="font-semibold">Create Giftcard</h3>
              <p className="text-slate-400 text-sm mt-1">Lock tokens behind a secret code users can claim.</p>
            </div>
            <div className="p-4 rounded-md border border-[#11121a] hover:bg-[#08112a]">
              <h3 className="font-semibold">Batch Payment</h3>
              <p className="text-slate-400 text-sm mt-1">Send payroll to multiple addresses in one flow.</p>
            </div>
            <div className="p-4 rounded-md border border-[#11121a] hover:bg-[#08112a]">
              <h3 className="font-semibold">Claim Giftcard</h3>
              <p className="text-slate-400 text-sm mt-1">Users redeem by providing the secret code.</p>
            </div>
            <div className="p-4 rounded-md border border-[#11121a] hover:bg-[#08112a]">
              <h3 className="font-semibold">Audit Logs</h3>
              <p className="text-slate-400 text-sm mt-1">Events are emitted for every action for easy verification.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <aside className="bg-[#071026] rounded-xl p-6 shadow-lg border border-[#11121a]">
        <h3 className="font-semibold mb-2">Demo Checklist</h3>
        <ul className="text-sm text-slate-400 space-y-2">
          <li>• Connect MetaMask</li>
          <li>• Deploy / use test ERC20</li>
          <li>• Create → Claim → Batch</li>
        </ul>

        <div className="mt-6">
          <Link to="/about" className="text-sm text-slate-300 hover:underline">Learn more about FlowPay →</Link>
        </div>
      </aside>
    </div>
  );
}
