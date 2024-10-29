import { ethers } from 'ethers';
import contractABI from "./abi.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
// const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

let contractInstance= <ethers.Contract | null>(null);

const initializeContract = async (): Promise<ethers.Contract | null> => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      contractInstance = contract;
      console.log("Contract initialized");
      return contract;
    } catch (error) {
      console.error('Failed to initialize contract:', error);
      return null;
    }
  } else {
    console.error('Ethereum object not found, install MetaMask.');
    return null;
  }
};

const getInstance = () => {
  return contractInstance;
}


function makePayment(amount: number, description: string, recipient: string, sentToOrg: boolean) {
  if (contractInstance) {
    contractInstance.makePayment(amount, description, recipient, sentToOrg);
  }
}

function addTransaction(amount: number, description: string, recipient: string, sender: string, sentToOrg: boolean, timestamp: number) {
  if (contractInstance) {
    console.log("Adding transaction");
    contractInstance.addTransaction(amount, description, recipient, sender, sentToOrg, timestamp);
  }
}

const getTransactions= async() => {
  if (contractInstance) {
    let txns = await contractInstance.getTransactions();
    return txns;
  }
}
const getRecentTransactions= async() => {
  if (contractInstance) {
    let txns = await contractInstance.getRecentTransactions();
    return txns;
  }
}
const returnTestVal = async() => {
  if (contractInstance) {
    const val = await contractInstance.getTest();
    console.log("Getting test value", val);
      return val;
  }
}

export {initializeContract, makePayment, addTransaction, getTransactions, getInstance, getRecentTransactions, returnTestVal };

