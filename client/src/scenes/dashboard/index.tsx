// dashboard/index.tsx
import { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row3 from "./Row3";
import { useContract } from "@/connection/fsContractContext";
import {
  GetTransactionsResponse,
  TransactionData,
  TransactionsPerMonth,
  AmountPerMonth,
  Account,
  SentReceived
} from '@/state/types';
 

// Convert TransactionData[] to GetTransactionsResponse[] with formatted dates
function convertTransactionDates(transactions: TransactionData[]): GetTransactionsResponse[] {
  return transactions.map(transaction => {
    const date = new Date(Number(transaction.timestamp) * 1000); 
    return {
      ...transaction,
      amount: Number(transaction.amount),
      timestamp: Number(transaction.timestamp),
      date: {
        day: date.getDate(),
        month: date.getMonth() + 1, // Months are zero-indexed
        year: date.getFullYear()
      }
    };
  });
}
  
function calculateTransactionsPerMonth(transactions: GetTransactionsResponse[]): TransactionsPerMonth[] {
  const monthlyTransactions = transactions.reduce<Record<string, { count: number; received: number; sent: number }>>((acc, transaction) => {
    const date = new Date(transaction.timestamp * 1000);
    const month = date.toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = { count: 0, received: 0, sent: 0 };
    }
    acc[month].count += 1;
    if (transaction.sentToOrg) {
      acc[month].received += 1;
    } else {
      acc[month].sent += 1;
    }
    return acc;
  }, {});

  return Object.entries(monthlyTransactions).map(([month, { count, received, sent }]) => ({
    Month: month,
    amtOfTxn: count,
    received: received,
    sent: sent
  }));
}

export function calculateAmountOfMoneyPerMonth(transactions: GetTransactionsResponse[]): AmountPerMonth[] {
  const monthlyAmounts = transactions.reduce<Record<string, number>>((acc, transaction) => {
    const date = new Date(transaction.timestamp * 1000);
    const month = date.toLocaleString('default', { month: 'long' });
    acc[month] = (acc[month] || 0) + transaction.amount; // Sum amounts
    return acc;
  }, {});

  return Object.entries(monthlyAmounts).map(([month, total]) => ({
    Month: month,
    amt: total
  }));
}

export function calculateTotalSentReceived(transactions: GetTransactionsResponse[]): SentReceived {
  const totals = transactions.reduce<SentReceived>((acc, transaction) => {
    if (transaction.sentToOrg) {
      acc.received += transaction.amount;
    } else {
      acc.sent += transaction.amount;
    }
    return acc;
  }, { sent: 0, received: 0 });

  return { sent: totals.sent, received: totals.received };
}


const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { contractInstance, getTransactions, getAccounts } = useContract();
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [processedTxn, setProcessedTxn] = useState<GetTransactionsResponse[]>([]);
  const [transactionsPerMonth, setTransactionsPerMonth] = useState<TransactionsPerMonth[]>([]);
  const [amountPerMonth, setAmountPerMonth] = useState<AmountPerMonth[]>([]);
  const [sentReceived, setSentReceived] = useState<SentReceived>({ sent: 0, received: 0 });
  const [accountList, setAccountList] = useState<Account[]>([]);


  // Function to get the last 12 months' transactions
function getLast12MonthsTransactions(transactions: GetTransactionsResponse[]): GetTransactionsResponse[] {
  const now = new Date();
  const last12Months = new Date();
  last12Months.setMonth(now.getMonth() - 12); // 12 months ago

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.timestamp * 1000);
    return transactionDate >= last12Months; // Only keep transactions within the last 12 months
  });
}


  
  useEffect(() => {
    const getData = async () => {
      if (contractInstance) {
        // Fetch transactions data
        const transactionsData: GetTransactionsResponse[] = await getTransactions();
        
        // Convert transaction data into objects of type TransactionData
        const formattedTransactions: TransactionData[] = transactionsData.map(transaction => ({
          amount: transaction.amount.toString(),           // Convert number to string
          description: transaction.description,
          recipient: transaction.recipient,
          sender: transaction.sender,
          sentToOrg: transaction.sentToOrg,
          timestamp: transaction.timestamp.toString(),      // Convert number to string
        }));
        
        setTransactions(formattedTransactions);

        // Fetch and format accounts list
        const accountsList = await getAccounts();
        const formattedAccounts: Account[] = accountsList.map((account: string) => ({ id: account }));
        setAccountList(formattedAccounts);

        // Process transactions and set other states
        let processedTransaction: GetTransactionsResponse[] = convertTransactionDates(formattedTransactions);

      // ✅ **Filter only last 12 months**
      processedTransaction = getLast12MonthsTransactions(processedTransaction);
      setProcessedTxn(processedTransaction);

      // ✅ Update calculations to use filtered transactions
      setTransactionsPerMonth(calculateTransactionsPerMonth(processedTransaction));
      setAmountPerMonth(calculateAmountOfMoneyPerMonth(processedTransaction));
      setSentReceived(calculateTotalSentReceived(processedTransaction));
      }
    };

    getData();
  }, [contractInstance]);

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(5, minmax(100px, 1fr))",
              gridTemplateRows: "repeat(4, minmax(240px, 1fr))",
              gridTemplateAreas: `
                " b b e e c c "
                " b b e e c c "
                " g g g g h h "
                " g g g g h h "
              `,
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: `
                "b"
                "b"
                "c"
                "c"
                "e"
                "e"
                "g"
                "g"
                "h"
                "h"
              `,
            }
      }
    >
        <Row1
          totalAmountOfTransactions={transactionsPerMonth}
          totalAmountPerMonth={amountPerMonth}
          receivedVsSent={sentReceived}
        />
      <Row3
        trackedAccounts={accountList}
        updatedTransactionsList={processedTxn}
      />
    </Box>
  );
};

export default Dashboard;
