import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContract } from "@/connection/fsContractContext";
import { GetTransactionsResponse } from "@/state/types";
import DashboardBox from "@/components/DashboardBox";

const Transactions = () => {
  const { palette } = useTheme();
  const { getTransactions } = useContract();
  const [transactions, setTransactions] = useState<GetTransactionsResponse[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const txnList = await getTransactions();
        console.log("Transactions fetched:", txnList); // Debugging

        if (txnList && txnList.length > 0) {
          // Map the transaction data to a new structure with named fields
          const updatedTxnList = txnList.map((txn) => ({
            timestamp: Number(txn.timestamp), // Ensure timestamp is a number
            amount: txn[0]?.toString() || "0", // Map indexed value to 'amount'
            description: txn[1], // Map indexed value to 'description'
            sender: txn[2], // Map indexed value to 'sender'
            receiver: txn[3], // Map indexed value to 'receiver'
          }));

          // Sort transactions by timestamp in descending order
          updatedTxnList.sort((a, b) => b.timestamp - a.timestamp);

          console.log("Sorted Transactions:", updatedTxnList); // Debugging
          setTransactions(updatedTxnList);
        } else {
          console.log("No transactions found.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    {
      field: "timestamp",
      headerName: "Date",
      flex: 1,
      renderCell: (params) =>
        new Date(params.value * 1000).toLocaleDateString(), // Convert timestamp
    },
    { field: "sender", headerName: "Sender", flex: 1 },
    { field: "receiver", headerName: "Receiver", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => params.value?.toString() || "0", // Convert BigInt to string
    },
    { field: "description", headerName: "Description", flex: 1 },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="h-[90vh] w-[100vw] bg-[#5D2E8C] rounded-md overflow-hidden p-4 shadow-lg">
        <h2 className="text-[#ffdf80] text-2xl font-bold mb-4">Transaction History</h2>
        <div className="h-[80vh] bg-[#e6e6e6] rounded-md p-2 overflow-auto">
          <DataGrid
            rows={transactions}
            columns={columns}
            getRowId={(row) => `${row.timestamp}-${row.sender}`} // Ensure unique row IDs
            pageSize={10}
            className="bg-white text-black"
          />
        </div>
      </div>
    </div>
  );
  
  
};

export default Transactions;
