import { GetTransactionsResponse, TransactionsPerMonth, AmountPerMonth,Account, SentReceived } from '../state/typesnew';

export const updatedTransactionsList: GetTransactionsResponse[];
export const trackedAccounts: Account[];
export const totalAmountOfTransactions: TransactionsPerMonth[];
export const totalAmountPerMonth: AmountPerMonth[];
export const receivedVsSent: SentReceived;