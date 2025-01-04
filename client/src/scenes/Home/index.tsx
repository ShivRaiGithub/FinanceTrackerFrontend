import { useState } from "react";
import { useContract } from "@/connection/ooContractContext";
import { useContract as useFSContract } from "@/connection/fsContractContext";
import { useNavigate } from "react-router-dom";

export default function Home(): React.ReactElement {
  const { connectWallet, account, settingInitTrue, getFSAddressesByOwner, signer, setIfOwner } = useContract();
  const { setContractSignerAccount, setFinanceContract } = useFSContract();
  const navigate = useNavigate();
  
  const [role, setRole] = useState<"owner" | "user" | null>(null);
  const [fsAddresses, setFSAddresses] = useState<string[]>([]);
  const [selectedFSAddress, setSelectedFSAddress] = useState<string>("");

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
      setFinanceContract()
      settingInitTrue();
      setTimeout(() => navigate("/logTransaction"), 1000);
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
          {fsAddresses.length > 0 ? (
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
          ) : (
            <p>No deployed finance systems found.</p>
          )}
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
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
