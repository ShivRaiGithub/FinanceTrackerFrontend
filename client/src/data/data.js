import {getTransactions} from "../connection/contractInstance";
export const transactions = getTransactions();

export const transactions1 = [
  {
    "amount": 1000,
    "description": "Subscription Service Payment",
    "recipient": "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98",
    "sender": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sentToOrg": false,
    "timestamp": 1701753600,  // Jan 4, 2024
    "accountBalance": 15000
  },
  {
    "amount": 750,
    "description": "Office Rent",
    "recipient": "0x876543210ABCDEF9876543210ABCDEF987654321",
    "sender": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sentToOrg": false,
    "timestamp": 1704172800,  // Feb 1, 2024
    "accountBalance": 14000
  },
  {
    "amount": 2000,
    "description": "Client Payment Received",
    "recipient": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sender": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sentToOrg": true,
    "timestamp": 1706784000,  // Mar 2, 2024
    "accountBalance": 17000
  },
  {
    "amount": 1500,
    "description": "Payment for Services",
    "recipient": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sender": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sentToOrg": true,
    "timestamp": 1709366400,  // Apr 1, 2024
    "accountBalance": 13500
  },
  {
    "amount": 1200,
    "description": "Freelancer Payment",
    "recipient": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sender": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sentToOrg": false,
    "timestamp": 1712044800,  // May 1, 2024
    "accountBalance": 14500
  },
  {
    "amount": 2500,
    "description": "Product Sales",
    "recipient": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sender": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sentToOrg": true,
    "timestamp": 1714627200,  // Jun 1, 2024
    "accountBalance": 19500
  },
  {
    "amount": 3000,
    "description": "Consultation Fees",
    "recipient": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sender": "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98",
    "sentToOrg": true,
    "timestamp": 1717219200,  // Jul 1, 2024
    "accountBalance": 17500
  },
  {
    "amount": 500,
    "description": "Office Supplies",
    "recipient": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sender": "0x6543210FEDCBA9876543210FEDCBA9876543210F",
    "sentToOrg": false,
    "timestamp": 1719907200,  // Aug 1, 2024
    "accountBalance": 13500
  },
  {
    "amount": 800,
    "description": "Utility Bill Payment",
    "recipient": "0x876543210ABCDEF9876543210ABCDEF987654321",
    "sender": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sentToOrg": false,
    "timestamp": 1722489600,  // Sep 1, 2024
    "accountBalance": 12700
  },
  {
    "amount": 1800,
    "description": "Received from Partner",
    "recipient": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sender": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sentToOrg": true,
    "timestamp": 1725072000,  // Oct 1, 2024
    "accountBalance": 21300
  },
  {
    "amount": 700,
    "description": "Advertising Payment",
    "recipient": "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98",
    "sender": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sentToOrg": false,
    "timestamp": 1727750400,  // Nov 1, 2024
    "accountBalance": 20400
  },
  {
    "amount": 3000,
    "description": "Sales Revenue",
    "recipient": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sender": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sentToOrg": true,
    "timestamp": 1730332800,  // Dec 1, 2024
    "accountBalance": 19700
  },
  {
    "amount": 900,
    "description": "Web Development Contract",
    "recipient": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sender": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sentToOrg": true,
    "timestamp": 1705440000,  // Feb 15, 2024
    "accountBalance": 12800
  },
  {
    "amount": 2200,
    "description": "Partner Commission",
    "recipient": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sender": "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98",
    "sentToOrg": true,
    "timestamp": 1712544000,  // May 8, 2024
    "accountBalance": 21700
  },
  {
    "amount": 400,
    "description": "IT Services Payment",
    "recipient": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sender": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sentToOrg": false,
    "timestamp": 1717718400,  // Jul 7, 2024
    "accountBalance": 14700
  },
  {
    "amount": 1600,
    "description": "Maintenance Fees",
    "recipient": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sender": "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98",
    "sentToOrg": true,
    "timestamp": 1721193600,  // Aug 15, 2024
    "accountBalance": 17200
  },
  {
    "amount": 300,
    "description": "Food Supplies",
    "recipient": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sender": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sentToOrg": false,
    "timestamp": 1725580800,  // Oct 7, 2024
    "accountBalance": 20400
  },
  {
    "amount": 700,
    "description": "Travel Expenses",
    "recipient": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sender": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sentToOrg": false,
    "timestamp": 1728364800,  // Nov 7, 2024
    "accountBalance": 13100
  },
  {
    "amount": 2100,
    "description": "Annual Bonus Payment",
    "recipient": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sender": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sentToOrg": true,
    "timestamp": 1731724800,  // Dec 15, 2024
    "accountBalance": 19800
  },
  {
    "amount": 650,
    "description": "Support Payment",
    "recipient": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sender": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sentToOrg": false,
    "timestamp": 1715472000,  // Jun 11, 2024
    "accountBalance": 14100
  },
  {
    "amount": 1100,
    "description": "Freelance Work",
    "recipient": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sender": "0x876543210ABCDEF9876543210ABCDEF987654321",
    "sentToOrg": false,
    "timestamp": 1718160000,  // Jul 12, 2024
    "accountBalance": 15900
  },
  {
    "amount": 900,
    "description": "Software Licensing",
    "recipient": "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "sender": "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "sentToOrg": false,
    "timestamp": 1719369600,  // Jul 26, 2024
    "accountBalance": 18700
  },
  {
    "amount": 500,
    "description": "Equipment Purchase",
    "recipient": "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "sender": "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "sentToOrg": false,
    "timestamp": 1721712000,  // Aug 23, 2024
    "accountBalance": 15000
  }
]


  
export const trackedAccountsList = 
  [
    "0x1234567890ABCDEF1234567890ABCDEF12345678",
    "0x9876543210FEDCBA9876543210FEDCBA98765432",
    "0xDEF1234567890ABCDEF1234567890ABCDEF12345",
    "0xABCDEF1234567890ABCDEF1234567890ABCDEF12",
    "0xFEDCBA9876543210FEDCBA9876543210FEDCBA98"
]
