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
    <Box width="100%" p={3}>
      <DashboardBox>
        <BoxHeader title="Manage Accounts" />
        <Box display="flex" gap={2} my={2}>
          <TextField
            label="New Account"
            value={newAccount}
            onChange={(e) => setNewAccount(e.target.value)}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleAddAccount}>
            Add Account
          </Button>
        </Box>
        <Box height={400}>
          <DataGrid
            rows={trackedAccounts}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
          />
        </Box>
      </DashboardBox>
    </Box>
  );
};

export default Accounts;
