// contractContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./abi.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

interface ContractContextType {
  contractInstance: ethers.Contract | null;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractInstance, setContractInstance] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          setContractInstance(contract);
          console.log("Contract initialized");
        } catch (error) {
          console.error("Failed to initialize contract:", error);
        }
      } else {
        console.error("Ethereum object not found, install MetaMask.");
      }
    };

    initializeContract();
  }, []);

  return (
    <ContractContext.Provider value={{ contractInstance }}>
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
