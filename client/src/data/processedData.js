import { convertTransactionDates, calculateTransactionsPerMonth, calculateAmountOfMoneyPerMonth, calculateTotalSentReceived } from "../utils/utils";
import { transactions, trackedAccountsList } from "./data";

export const updatedTransactionsList = convertTransactionDates(transactions);
export const trackedAccounts = trackedAccountsList.map((account, index) => ({
  id: index,
  account,
}));

export const totalAmountOfTransactions = calculateTransactionsPerMonth(transactions);
export const totalAmountPerMonth = calculateAmountOfMoneyPerMonth(transactions);
export const receivedVsSent = calculateTotalSentReceived(transactions);
