import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum);
      setProvider(p);

      window.ethereum.on && window.ethereum.on("accountsChanged", (accs) => {
        setAccount(accs[0] ?? null);
      });
      window.ethereum.on && window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const connect = async () => {
    if (!window.ethereum) throw new Error("MetaMask not detected");
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const p = new ethers.BrowserProvider(window.ethereum);
    const s = await p.getSigner();
    const addr = await s.getAddress();
    const bal = await p.getBalance(addr);
    const net = await p.getNetwork();
    setProvider(p);
    setSigner(s);
    setAccount(addr);
    setBalance(bal);
    setChainId(net.chainId);
    return { provider: p, signer: s, account: addr };
  };

  return (
    <WalletContext.Provider value={{ provider, signer, account, balance, connect, chainId }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
