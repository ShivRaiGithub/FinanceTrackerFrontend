import { useContract } from '@/connection/contractContext';
import { useNavigate } from 'react-router-dom';

export default function Home(): React.ReactElement {
  const { connectWallet, account } = useContract();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Organization Finance Tracker</h1>
      <p>Log and Track all Finances made through your accounts</p>

      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
      )}
    </div>
  );
}
