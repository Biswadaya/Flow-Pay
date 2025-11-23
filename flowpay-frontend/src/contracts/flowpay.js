import { ethers } from "ethers";

// Paste your FlowPay contract ABI here
import FLOWPAY_ABI from "./flowpayABI.json";

// Replace with your deployed FlowPay contract address
export const FLOWPAY_ADDRESS = process.env.VITE_CONTRACT_ADDRESS;

let provider, signer, contract;

export const connectContract = async (externalProvider) => {
  provider = new ethers.BrowserProvider(externalProvider);
  signer = await provider.getSigner();
  contract = new ethers.Contract(FLOWPAY_ADDRESS, FLOWPAY_ABI, signer);
  return contract;
};

export const getContract = () => {
  if (!contract) throw new Error("Contract not connected yet!");
  return contract;
};
