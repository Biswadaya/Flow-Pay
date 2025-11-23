import { ethers } from "ethers";
export const codeHash = (code) => ethers.keccak256(ethers.toUtf8Bytes(code));
