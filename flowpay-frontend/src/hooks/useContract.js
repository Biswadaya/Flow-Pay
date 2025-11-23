import { Contract } from "ethers";
import ABI from "../abi/FlowPayABI.json";

export function getFlowPayContract(signerOrProvider){
  const address = import.meta.env.VITE_CONTRACT_ADDRESS;
  if(!address) throw new Error("VITE_CONTRACT_ADDRESS not set in .env");
  return new Contract(address, ABI, signerOrProvider);
}
