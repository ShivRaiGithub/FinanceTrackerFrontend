import { useState } from "react";
import { useContract } from "@/connection/ooContractContext";
import { useContract as useFSContract } from "@/connection/fsContractContext";
import { useNavigate } from "react-router-dom";

export default function Home(): React.ReactElement {
  const { connectWallet, account, settingInitTrue, getFSAddressesByOwner, signer, setIfOwner, createFS } = useContract();
  const { setContractSignerAccount, setFinanceContract } = useFSContract();
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
    <div>
      <h1>Organization Finance Tracker</h1>
      <p>Log and Track all Finances made through your accounts</p>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : role === null ? (
        <div>
          <button onClick={handleOwnerLogin}>Log in as Owner</button>
          <button onClick={handleUserLogin}>Log in as User</button>
        </div>
      ) : role === "owner" ? (
        <div>
          <h2>Select a Finance System</h2>
          {fsAddresses.length > 0 && (
            <>
              <select onChange={(e) => setSelectedFSAddress(e.target.value)}>
                <option value="">Select an address</option>
                {fsAddresses.map((address) => (
                  <option key={address} value={address}>{address}</option>
                ))}
              </select>
              <button onClick={handleSelectFSAddress} disabled={!selectedFSAddress}>
                Login
              </button>
            </>
          )}
          <h2>Deploy a New Finance System</h2>
          <input
            type="text"
            placeholder="Finance System Name"
            value={newFSName}
            onChange={(e) => setNewFSName(e.target.value)}
          />
          <button onClick={handleDeployNewFS} disabled={!newFSName.trim()}>
            Deploy
          </button>
        </div>
      ) : (
        <div>
          <h2>Enter Finance System Address</h2>
          <input 
            type="text" 
            placeholder="Contract Address" 
            value={selectedFSAddress} 
            onChange={(e) => setSelectedFSAddress(e.target.value)} 
          />
          <button onClick={handleSelectFSAddress} disabled={!selectedFSAddress}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}
