import { useState } from "react";
import { useContract } from "@/connection/ooContractContext";
import { useContract as useFSContract } from "@/connection/fsContractContext";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";


export default function Home(): React.ReactElement {
  const { connectWallet, account, settingInitTrue, getFSAddressesByOwner, signer, setIfOwner, createFS } = useContract();
  const { setContractSignerAccount, setFinanceContract } = useFSContract();
  const { palette } = useTheme();
  const navigate = useNavigate();
  
  const [role, setRole] = useState<"owner" | "user" | null>(null);
  const [fsAddresses, setFSAddresses] = useState<string[]>([]);
  const [selectedFSAddress, setSelectedFSAddress] = useState<string>("");
  const [newFSName, setNewFSName] = useState<string>("");

  const handleOwnerLogin = async () => {
    if (account) {
      const addresses = await getFSAddressesByOwner();
      console.log(addresses);
      setFSAddresses(addresses);
      setIfOwner(true);
      setRole("owner");
    }
  };

  const handleUserLogin = () => {
    setIfOwner(false);
    setRole("user");
  };

  const handleSelectFSAddress = () => {
    if (signer && account && selectedFSAddress) {
      setContractSignerAccount(selectedFSAddress, signer, account);
      setFinanceContract(selectedFSAddress, signer);
      settingInitTrue();
      setTimeout(() => navigate("/logTransaction"), 2000);
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
          className="px-6 py-3 font-semibold rounded-lg shadow-md transition-all"
          style={{ backgroundColor: "#ffdf80", color: "#1a1a1a" }}
        >
          Connect Wallet
        </button>
      ) : role === null ? (
        <div className="flex gap-4">
          <button
            onClick={handleOwnerLogin}
            className="px-5 py-2 font-semibold rounded-lg shadow-md transition-all"
            style={{ backgroundColor: "#ff6666", color: "#e6e6e6" }}
          >
            Log in as Owner
          </button>
          <button
            onClick={handleUserLogin}
            className="px-5 py-2 font-semibold rounded-lg shadow-md transition-all"
            style={{ backgroundColor: "#5D2E8C", color: "#e6e6e6" }}
          >
            Log in as User
          </button>
        </div>
      ) : role === "owner" ? (
        <div className="w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2" style={{ color: "#4d4d4d" }}>
            Select a Finance System
          </h2>
          {fsAddresses.length > 0 && (
            <>
              <select
                className="w-full p-2 mb-4 rounded-md focus:outline-none"
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
              <button
                onClick={handleSelectFSAddress}
                disabled={!selectedFSAddress}
                className="px-6 py-3 w-full font-semibold rounded-lg shadow-md transition-all"
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
            className="px-6 py-3 w-full font-semibold rounded-lg shadow-md transition-all"
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
            onClick={handleSelectFSAddress}
            disabled={!selectedFSAddress}
            className="px-6 py-3 w-full font-semibold rounded-lg shadow-md transition-all"
            style={{
              backgroundColor: selectedFSAddress ? "#ffcc33" : "#666666",
              color: selectedFSAddress ? "#1a1a1a" : "#b3b3b3",
              cursor: selectedFSAddress ? "pointer" : "not-allowed",
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
  
}  