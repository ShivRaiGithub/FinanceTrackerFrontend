import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import ooContractABI from "./ooabi.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const ooContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface ContractContextType {
  connectWallet: () => Promise<void>;
  ooContractInstance: ethers.Contract | null;
  account: string | null;
  signer: ethers.Signer | null;
  createFS: (orgName: string) => Promise<any> | "0";
  getFSAddressesByOwner: () => Promise<any>;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ooContractInstance, setOoContractInstance] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const connectWallet = async () => {
    if (window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        console.log("Account connected:", accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
        const contract = new ethers.Contract(ooContractAddress, ooContractABI, signer);
        setOoContractInstance(contract);
        console.log("Contract initialized");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("Ethereum object not found, install MetaMask.");
    }
  };

  const createFS = async (orgName: string) => {
    if (ooContractInstance) {
      console.log("Creating FS");
      const addr = await ooContractInstance.createFinanceSystem(orgName);
      return addr;
    }
    return "0";
  };

  const getFSAddressesByOwner = async () => {
    if (ooContractInstance) {
      const txns = await ooContractInstance.getFinanceSystemsList();
      return txns;
    }
    return [];
  };

  return (
    <ContractContext.Provider
      value={{
        connectWallet,
        ooContractInstance,
        account,
        signer,
        createFS,
        getFSAddressesByOwner,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
