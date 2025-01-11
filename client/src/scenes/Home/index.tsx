import { useState } from "react";
import { useContract } from "@/connection/ooContractContext";
import { useContract as useFSContract } from "@/connection/fsContractContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";


export default function Home(): React.ReactElement {
  const { connectWallet, account, settingInitTrue, getFSAddressesByOwner, signer, setIfOwner, createFS, checkAddr } = useContract();
  const { setContractSignerAccount, setFinanceContract } = useFSContract();
  const { palette } = useTheme();
  const navigate = useNavigate();
  
  const [role, setRole] = useState<"owner" | "user" | null>(null);
  const [fsAddresses, setFSAddresses] = useState<string[]>([]);
  const [selectedFSAddress, setSelectedFSAddress] = useState<string>("");
  const [newFSName, setNewFSName] = useState<string>("");
  const [warn, setWarn] = useState<boolean>(false);
  const handleOwnerLogin = async () => {
    if (account) {
      const addresses = await getFSAddressesByOwner();
      setFSAddresses(addresses);
      setIfOwner(true);
      setRole("owner");
    }
  };

  const handleUserLogin = () => {
    setIfOwner(false);
    setRole("user");
  };

  const handleSelectFSAddressB = async () => {
    if (checkAddr && selectedFSAddress) {
      const isValid = await checkAddr(selectedFSAddress);
      if (isValid) {
        handleSelectFSAddress();
        return;
      }
    }
    setWarn(true);
    setTimeout(() => setWarn(false), 1000);
  };

  const handleSelectFSAddress = () => {
    if (signer && account && selectedFSAddress) {
      setContractSignerAccount(selectedFSAddress, signer, account);
      setFinanceContract(selectedFSAddress, signer);
      settingInitTrue();
      setTimeout(() => navigate("/logTransaction"), 750);
    }
  };

  const handleDeployNewFS = async () => {
    if (newFSName.trim()) {
      const newAddress = await createFS(newFSName);
      if (newAddress !== "0") {
        setFSAddresses([...fsAddresses, newAddress]);
        setNewFSName("");
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{ backgroundColor: "#E8D7FF", color: "#1a1a1a" }} // Background & text color
    >
      <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: "#5D2E8C" }}>
        Organization Finance Tracker
      </h1>
      <p className="text-lg mb-6 text-center" style={{ color: "#808080" }}>
        Log and Track all Finances made through your accounts
      </p>
  
      {!account ? (
        <button
          onClick={connectWallet}
          className="px-6 py-3 font-semibold rounded-lg shadow-md "
          style={{ backgroundColor: "#ffdf80", color: "#1a1a1a" }}
        >
          Connect Wallet
        </button>
      ) : role === null ? (
        <div className="flex gap-4">
          <button
            onClick={handleOwnerLogin}
            className="px-5 py-2 font-semibold rounded-lg shadow-md "
            style={{ backgroundColor: "#ff6666", color: "#e6e6e6" }}
          >
            Log in as Owner
          </button>
          <button
            onClick={handleUserLogin}
            className="px-5 py-2 font-semibold rounded-lg shadow-md "
            style={{ backgroundColor: "#5D2E8C", color: "#e6e6e6" }}
          >
            Log in as User
          </button>
        </div>
      ) : role === "owner" ? (
        
        <div className="w-full max-w-md text-center">
          <button
      onClick={() => setRole(null)}
      className="px-4 py-2 mb-4 font-semibold rounded-lg shadow-md "
      style={{ backgroundColor: "#808080", color: "#ffffff" }}
    >
      Back
    </button>

    <h2 className="text-xl font-semibold mb-2" style={{ color: "#4d4d4d" }}>
  Select a Finance System
</h2>
{fsAddresses.length > 0 && (
  <>
    <div className="flex items-center mb-4">
      <select
        className="w-full p-2 rounded-md focus:outline-none"
        style={{
          backgroundColor: "#e6e6e6",
          color: "#1a1a1a",
          border: "1px solid #999999",
        }}
        onChange={(e) => setSelectedFSAddress(e.target.value)}
      >
        <option value="">Select an address</option>
        {fsAddresses.map((address) => (
          <option key={address} value={address}>{address}</option>
        ))}
      </select>
      {selectedFSAddress && (
        <button
  onClick={() => navigator.clipboard.writeText(selectedFSAddress)}
  className="ml-2 px-4 py-2 font-semibold rounded-lg shadow-md bg-yellow-400 text-gray-900 cursor-pointer active:bg-yellow-600"
>
  Copy
</button>

      )}
    </div>
    <button
      onClick={handleSelectFSAddress}
      disabled={!selectedFSAddress}
      className="px-6 py-3 w-full font-semibold rounded-lg shadow-md"
      style={{
        backgroundColor: selectedFSAddress ? "#ffd700" : "#666666",
        color: selectedFSAddress ? "#1a1a1a" : "#b3b3b3",
        cursor: selectedFSAddress ? "pointer" : "not-allowed",
      }}
    >
      Login
    </button>
  </>
)}


          <h2 className="text-xl font-semibold mt-6 mb-2" style={{ color: "#4d4d4d" }}>
            Deploy a New Finance System
          </h2>
          <input
            type="text"
            placeholder="Finance System Name"
            value={newFSName}
            onChange={(e) => setNewFSName(e.target.value)}
            className="w-full p-2 mb-2 rounded-md focus:outline-none"
            style={{
              backgroundColor: "#e6e6e6",
              color: "#1a1a1a",
              border: "1px solid #999999",
            }}
          />
          <button
            onClick={handleDeployNewFS}
            disabled={!newFSName.trim()}
            className="px-6 py-3 w-full font-semibold rounded-lg shadow-md"
            style={{
              backgroundColor: newFSName.trim() ? "#5D2E8C" : "#666666",
              color: "#e6e6e6",
              cursor: newFSName.trim() ? "pointer" : "not-allowed",
            }}
          >
            Deploy
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
          <button
      onClick={() => setRole(null)}
      className="px-4 py-2 mb-4 font-semibold rounded-lg shadow-md"
      style={{ backgroundColor: "#808080", color: "#ffffff" }}
    >
      Back
    </button>
          <h2 className="text-xl font-semibold mb-2" style={{ color: "#4d4d4d" }}>
            Enter Finance System Address
          </h2>
          <input 
            type="text" 
            placeholder="Contract Address" 
            value={selectedFSAddress} 
            onChange={(e) => setSelectedFSAddress(e.target.value)}
            className="w-full p-2 mb-2 rounded-md focus:outline-none"
            style={{
              backgroundColor: "#e6e6e6",
              color: "#1a1a1a",
              border: "1px solid #999999",
            }}
          />
          <button
            onClick={handleSelectFSAddressB}
            disabled={!selectedFSAddress}
            className="px-6 py-3 w-full font-semibold rounded-lg shadow-md "
            style={{
              backgroundColor: selectedFSAddress ? "#ffcc33" : "#666666",
              color: selectedFSAddress ? "#1a1a1a" : "#b3b3b3",
              cursor: selectedFSAddress ? "pointer" : "not-allowed",
            }}
          >
            Login
          </button>
{warn  && (<h2 className="text-l font-semibold mt-2" style={{ color: "#4d4d4d" }}>
            Please check address again
          </h2>) 
}
          
        
        </div>
      )}
    </div>
  );
  
}  