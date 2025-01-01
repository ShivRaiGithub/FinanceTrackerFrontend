import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./fsabi.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface ContractContextType {
  connectWallet: () => Promise<void>;
  contractInstance: ethers.Contract | null;
  account: string | null;
  makePayment: (amount: number, description: string, recipient: string, sentToOrg: boolean) => void;
  addTransaction: (
    amount: number,
    description: string,
    recipient: string,
    sender: string,
    sentToOrg: boolean,
    timestamp: number
  ) => void;
  getTransactions: () => Promise<any>;
  getAccounts: () => Promise<any>;
  getRecentTransactions: () => Promise<any>;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractInstance, setContractInstance] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        console.log("Account connected:", accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setContractInstance(contract);
        console.log("Contract initialized");
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("Ethereum object not found, install MetaMask.");
    }
  };

  const addTransaction = (
    amount: number,
    description: string,
    recipient: string,
    sender: string,
    sentToOrg: boolean,
    timestamp: number
  ) => {
    if (contractInstance) {
      console.log("Adding transaction");
      contractInstance.addTransaction(amount, description, recipient, sender, sentToOrg, timestamp);
    }
  };

  const getTransactions = async () => {
    if (contractInstance) {
      const txns = await contractInstance.getTransactions();
      return txns;
    }
    return [];
  };

  const getAccounts = async () => {
    if (contractInstance) {
      const accounts = await contractInstance.getAccountsList();
      return accounts;
    }
    return [];
  };

  const getRecentTransactions = async () => {
    if (contractInstance) {
      const recentTxns = await contractInstance.getRecentTransactions();
      return recentTxns;
    }
    return [];
  };

  return (
    <ContractContext.Provider
      value={{
        connectWallet,
        contractInstance,
        account,
        addTransaction,
        getTransactions,
        getAccounts,
        getRecentTransactions,
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
