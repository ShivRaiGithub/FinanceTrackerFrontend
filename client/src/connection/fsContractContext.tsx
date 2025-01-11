import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./fsabi.json";

interface ContractContextType {
  setFinanceContract: (addr : string, sign : ethers.Signer)  => Promise<void>;
  contractInstance: ethers.Contract | null;
  account: string | null;
  orgName: string | null;
  signer: ethers.Signer | null;
  setContractSignerAccount: (address: string, sign: ethers.Signer, account: string) => void;
  addTransaction: (amount: number,description: string,recipient: string,sender: string,sentToOrg: boolean,timestamp: number) => void;
  getTransactions: () => Promise<any>;
  getAccounts: () => Promise<any>;
  addAccount: (acc: string) => Promise<any>;
  removeAccount: (acc: string) => Promise<any>;
  getRecentTransactions: () => Promise<any>;
}

const FsContractContext = createContext<ContractContextType | undefined>(undefined);

export const FsContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractAddress, setContractAddress]= useState<string | null>(null);
  const [contractInstance, setContractInstance] = useState<ethers.Contract | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string | null>(null);

  const setFinanceContract = async (addr : string, sign : ethers.Signer) => {

    if (addr!=null && sign!=null) {
      try {
        const contract = new ethers.Contract(addr, contractABI, sign);
        const orgname = await contract.getOrgName();
        setOrgName(orgname);
        setContractInstance(contract);
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

  

  const addTransaction = async (amount: number,description: string,recipient: string,sender: string,sentToOrg: boolean,timestamp: number) => {
    if (contractInstance) {
      const tx = await contractInstance.addTransaction(amount, description, recipient, sender, sentToOrg, timestamp);
      await tx.wait();
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
  const addAccount = async (acc : string) => {
    if (contractInstance) {
      const txn = await contractInstance.addAccount(acc);
      await txn.wait();
    }
  };

  const removeAccount = async (acc: string) => {
    if (contractInstance) {
      const txn = await contractInstance.removeAccount(acc);
      await txn.wait();
    }
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
      value={{setFinanceContract,contractInstance,account,signer,setContractSignerAccount,addTransaction,getTransactions,orgName,getAccounts,getRecentTransactions,addAccount, removeAccount}}>
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
