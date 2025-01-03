import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./fsabi.json";

interface ContractContextType {
  setFinanceContract: () => Promise<void>;
  contractInstance: ethers.Contract | null;
  account: string | null;
  signer: ethers.Signer | null;
  setContractSignerAccount: (address: string, sign: ethers.Signer, account: string) => void;
  addTransaction: (amount: number,description: string,recipient: string,sender: string,sentToOrg: boolean,timestamp: number) => void;
  getTransactions: () => Promise<any>;
  getAccounts: () => Promise<any>;
  getRecentTransactions: () => Promise<any>;
}

const FsContractContext = createContext<ContractContextType | undefined>(undefined);

export const FsContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractAddress, setContractAddress]= useState<string | null>(null);
  const [contractInstance, setContractInstance] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const setFinanceContract = async () => {
    if (contractAddress!=null && signer!=null) {
      try {
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

  const setContractSignerAccount = (address: string, sign: ethers.Signer, account: string) =>{
    setContractAddress(address);
    setSigner(sign);
    setAccount(account);
  }

  

  const addTransaction = (amount: number,description: string,recipient: string,sender: string,sentToOrg: boolean,timestamp: number) => {
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
    <FsContractContext.Provider
      value={{setFinanceContract,contractInstance,account,signer,setContractSignerAccount,addTransaction,getTransactions,getAccounts,getRecentTransactions,}}>
      {children}
    </FsContractContext.Provider>
  );
};

export const useContract = (): ContractContextType => {
  const context = useContext(FsContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
