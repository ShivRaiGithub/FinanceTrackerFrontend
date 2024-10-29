export const kpis = [
    {
      monthlyData: [
        { month: "January", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "February", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "March", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "April", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "May", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "June", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "July", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "August", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "September", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "October", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "November", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
        { month: "December", revenue: Math.floor(Math.random() * 10000) + 10000, expenses: Math.floor(Math.random() * 5000) + 2000 },
      ],
    },
  ];

  export const operations = [
    {
      monthlyData: [
        { month: "January", operationalExpenses: 3000, nonOperationalExpenses: 1500 },
        { month: "February", operationalExpenses: 3200, nonOperationalExpenses: 1600 },
        { month: "March", operationalExpenses: 2800, nonOperationalExpenses: 1400 },
        { month: "April", operationalExpenses: 3500, nonOperationalExpenses: 1700 },
        { month: "May", operationalExpenses: 4000, nonOperationalExpenses: 1800 },
        { month: "June", operationalExpenses: 3700, nonOperationalExpenses: 1600 },
        // Add more months as needed
        { month: "July", operationalExpenses: 3900, nonOperationalExpenses: 1900 },
        { month: "August", operationalExpenses: 4200, nonOperationalExpenses: 2000 },
        { month: "September", operationalExpenses: 4500, nonOperationalExpenses: 2100 },
        { month: "October", operationalExpenses: 4800, nonOperationalExpenses: 2200 },
        { month: "November", operationalExpenses: 5000, nonOperationalExpenses: 2300 },
        { month: "December", operationalExpenses: 5200, nonOperationalExpenses: 2400 },
      ],
    },
  ];
  export const products = [
    { id: "1", price: 100, expense: 80 },
    { id: "2", price: 150, expense: 120 },
    { id: "3", price: 200, expense: 160 },
    { id: "4", price: 250, expense: 200 },
    { id: "5", price: 300, expense: 240 },
    { id: "6", price: 350, expense: 280 },
    { id: "7", price: 400, expense: 300 },
    { id: "8", price: 450, expense: 320 },
    { id: "9", price: 500, expense: 350 },
    { id: "10", price: 550, expense: 380 },
  ];
  
  export const transactions = [
    { id: "1", buyer: "Alice", amount: 150, productIds: ["1", "2"] },
    { id: "2", buyer: "Bob", amount: 200, productIds: ["2", "3"] },
    { id: "3", buyer: "Charlie", amount: 300, productIds: ["1", "4"] },
    { id: "4", buyer: "David", amount: 250, productIds: ["3", "5"] },
    { id: "5", buyer: "Eve", amount: 400, productIds: ["4", "6"] },
    { id: "6", buyer: "Frank", amount: 350, productIds: ["5", "7"] },
    { id: "7", buyer: "Grace", amount: 450, productIds: ["6", "8"] },
    { id: "8", buyer: "Heidi", amount: 500, productIds: ["7", "9"] },
    { id: "9", buyer: "Ivan", amount: 600, productIds: ["8", "10"] },
    { id: "10", buyer: "Judy", amount: 550, productIds: ["1", "2", "3"] },
  ];