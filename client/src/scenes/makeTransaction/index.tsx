import React, { useState, ChangeEvent, FormEvent } from 'react';
import DashboardBox from '@/components/DashboardBox';
import { TransactionData, FormField } from '@/state/types';
import { useContract } from "@/connection/contractContext";

const MakeTransaction: React.FC = () => {
  const { contractInstance } = useContract();

  const [transaction, setTransaction] = useState<TransactionData>({
    amount: '',
    description: '',
    recipient: '',
    sender: '',
    sentToOrg: false,
    timestamp: '',
    accountBalance: ''
  });
  const [notification, setNotification] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setTransaction(prev => ({ ...prev, [name]: newValue }));
  };

  const getRecent = async () => {
    if (contractInstance) {
      try {
        const recentTransaction = await contractInstance.getRecentTransactions();
        console.log("Recent Transaction:", recentTransaction);
      } catch (error) {
        console.error("Error getting recent transaction:", error);
        setNotification('Failed to get recent transaction.');
      }
    } else {
      console.log("No instance");
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contractInstance) {
      try {
        const parsedAmount = parseInt(transaction.amount);
        const parsedTimestamp = new Date(transaction.timestamp).getTime();

        await contractInstance.addTransaction(
          parsedAmount,
          transaction.description,
          transaction.recipient,
          transaction.sender,
          transaction.sentToOrg,
          parsedTimestamp
        );

        setNotification('Transaction in process...');
        setTransaction({
          amount: '',
          description: '',
          recipient: '',
          sender: '',
          sentToOrg: false,
          timestamp: '',
          accountBalance: ''
        });

        // Clear notification after 3 seconds
        setTimeout(() => setNotification(''), 3000);
      } catch (error) {
        console.error("Error logging transaction:", error);
        setNotification('Failed to log transaction.');
      }
    } else {
      console.log("No instance");
    }
  };

  const formFields: FormField[] = [
    { label: 'Amount', type: 'number', name: 'amount' },
    { label: 'Description', type: 'textarea', name: 'description' },
    { label: 'Recipient', type: 'text', name: 'recipient' },
    { label: 'Sender', type: 'text', name: 'sender' },
    { label: 'Sent to Organization', type: 'checkbox', name: 'sentToOrg' },
    { label: 'Timestamp', type: 'datetime-local', name: 'timestamp' },
    { label: 'Account Balance', type: 'number', name: 'accountBalance' }
  ];

  return (
    <DashboardBox>
      <form onSubmit={handleSubmit} style={{
        padding: "2rem",
        display: "grid",
        gap: "1.5rem",
        maxWidth: "600px",
        margin: "0 auto",
        fontSize: "1.1rem",
        resize: "none"
      }}>
        {notification && (
          <div style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {notification}
          </div>
        )}
        {formFields.map(({ label, type, name }) => (
          <div key={name} className="form-field" style={{
            display: "grid",
            gridTemplateColumns: type === 'checkbox' ? "2fr 1fr" : "1fr 2fr",
            alignItems: "center",
            gap: "1rem"
          }}>
            <label htmlFor={name} style={{ fontWeight: "bold" }}>{label}:</label>
            {type === 'textarea' ? (
              <textarea
                id={name}
                name={name}
                value={transaction[name]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  resize: "none"
                }}
              />
            ) : (
              <input
                id={name}
                type={type}
                name={name}
                checked={type === 'checkbox' ? transaction[name] as boolean : undefined}
                value={type !== 'checkbox' ? transaction[name] : undefined}
                onChange={handleChange}
                min={type === 'number' ? 0 : undefined}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  ...(type === 'checkbox' ? {
                    width: "1.5rem",
                    height: "1.5rem",
                    accentColor: "#4CAF50",
                    cursor: "pointer"
                  } : {})
                }}
              />
            )}
          </div>
        ))}
        <button type="submit" style={{
          justifySelf: "center",
          padding: "0.75rem 1.5rem",
          fontSize: "1.1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}>Log Transaction</button>

        <button onClick={getRecent}> GET RECENT</button>
      </form>
    </DashboardBox>
  );
};

export default MakeTransaction;
