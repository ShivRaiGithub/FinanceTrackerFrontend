export interface GetTransactionsResponse {
  amount: number;
  description: string;
  recipient: string;
  sender: string;
  sentToOrg: boolean;
  timestamp: number;
  accountBalance: number;
  date: {
    day: number;
    month: number;
    year: number;
  };
}

export interface TransactionData {
  amount: string;
  description: string;
  recipient: string;
  sender: string;
  sentToOrg: boolean;
  timestamp: string;
  accountBalance: string;
}

export interface FormField {
  label: string;
  type: string;
  name: keyof TransactionData;
}
export interface TransactionsPerMonth {
  Month: string;
  amtOfTxn: number;
  received: number;
  sent: number;
}
export interface AmountPerMonth {
  Month: string;
  amt: number;
}

export interface Account{
  id:string;
}

export interface SentReceived{
  sent: number;
  received: number;
}