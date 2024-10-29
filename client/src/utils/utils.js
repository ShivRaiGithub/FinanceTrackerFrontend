
// Convert timestamps to Date components (day, month, year)
export function convertTransactionDates(transactions) {
  return transactions.map(transaction => {
    const date = new Date(transaction.timestamp * 1000); // Convert to milliseconds
    return {
      ...transaction,
      date: {
        day: date.getDate(),
        month: date.getMonth() + 1, // Months are zero-indexed
        year: date.getFullYear()
      }
    };
  });
}

// Calculate the number of transactions per month
export function calculateTransactionsPerMonth(transactions) {
  const monthlyTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.timestamp * 1000);
    const month = date.toLocaleString('default', { month: 'long' });
    if (!acc[month]) {
      acc[month] = { count: 0, received: 0, sent: 0 };
    }
    acc[month].count += 1;
    if (transaction.sentToOrg) {
      acc[month].received +=1;
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


// Calculate the total amount of money spent per month
export function calculateAmountOfMoneyPerMonth(transactions) {
  const monthlyAmounts = transactions.reduce((acc, transaction) => {
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
// ... existing code ...

// Calculate the total amount of money sent and received
export function calculateTotalSentReceived(transactions) {
  const totals = transactions.reduce((acc, transaction) => {
    if (transaction.sentToOrg) {
      acc.received += transaction.amount;
    } else {
      acc.sent += transaction.amount;
    }
    return acc;
  }, { sent: 0, received: 0 });

  return { sent: totals.sent, received: totals.received };
}

// ... existing code ...