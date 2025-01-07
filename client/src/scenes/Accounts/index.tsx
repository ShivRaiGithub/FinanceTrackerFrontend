import { useState, useEffect } from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContract } from "@/connection/fsContractContext";
import { useContract as useOoContract } from "@/connection/ooContractContext";
import { Account } from "@/state/types";
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";

const Accounts = () => {
  const { palette } = useTheme();
  const { getAccounts, addAccount, removeAccount } = useContract();
  const { account: ownerAccount } = useOoContract();
  const [trackedAccounts, setTrackedAccounts] = useState<Account[]>([]);
  const [newAccount, setNewAccount] = useState("");

  const fetchAccounts = async () => {
    if(ownerAccount) {
        const accountsList = await getAccounts();
        
  const filteredAccounts = accountsList
    .filter((acc: string) => acc.toLowerCase() !== ownerAccount.toLowerCase())
    .map((acc: string) => ({ id: acc }));

  setTrackedAccounts(filteredAccounts);
}
};

  useEffect(() => {
    
    fetchAccounts();
  }, [ownerAccount, getAccounts]);
  

  const handleAddAccount = async () => {
    if (newAccount.trim()) {
      await addAccount(newAccount);
      await fetchAccounts(); // Refetch accounts after adding
      setNewAccount("");
    }
  };

  const handleRemoveAccount = async (accountId: string) => {
    if (accountId !== ownerAccount) { // Prevent removing owner
      await removeAccount(accountId);
      await fetchAccounts(); // Refetch accounts after removing
    }
  };

  const columns = [
    { field: "id", headerName: "Account", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        params.row.id !== ownerAccount ? (
          <Button color="error" onClick={() => handleRemoveAccount(params.row.id)}>
            Remove
          </Button>
        ) : (
          <Button disabled>Owner</Button>
        )
      ),
    },
  ];

  
  return (
    <div className="w-full p-4">
      <div className=" shadow-md rounded-lg p-6" style={{
            backgroundColor: '#E8D7FF'}}>
        {/* Input Field and Add Button */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="New Account"
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none"
          />
          <button
            onClick={handleAddAccount}
            className="px-4 py-2 rounded-md font-semibold transition-all"
            style={{ backgroundColor: "#5D2E8C", color: "#e6e6e6" }}
          >
            Add Account
          </button>
        </div>
  
        {/* Data Grid */}
        <div className="h-[75vh] border border-gray-300 rounded-md overflow-hidden">

          <DataGrid
            rows={trackedAccounts}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
          />
        </div>
      </div>
    </div>
  );
  
};

export default Accounts;
