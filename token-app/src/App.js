import React, { useState } from 'react';
import { rewardBranch, convertToPoints, redeemPoints, getPointsBalance } from './ethereum';
import './App.css'; // Import the CSS file

function App() {
  const [branchAddress, setBranchAddress] = useState('');
  const [points, setPoints] = useState('');
  const [reward, setReward] = useState('');
  const [balance, setBalance] = useState(0);

  const handleReward = async (branch) => {
    console.log("Handle Reward clicked with branch address:", branch);
    try {
      await rewardBranch(branch);
      alert('Branch rewarded successfully');
    } catch (error) {
      console.error('Error rewarding branch:', error);
    }
  };

  const handleConvert = async () => {
    console.log("Handle Convert clicked");
    try {
      await convertToPoints(1); // converting 1 token
      alert('Token converted to points successfully');
    } catch (error) {
      console.error('Error converting token to points:', error);
    }
  };

  const handleRedeem = async () => {
    console.log("Handle Redeem clicked with points:", points, "and reward:", reward);
    try {
      await redeemPoints(points, reward);
      alert('Points redeemed successfully');
    } catch (error) {
      console.error('Error redeeming points:', error);
    }
  };

  const handleGetBalance = async () => {
    console.log("Handle Get Balance clicked for branch address:", branchAddress);
    try {
      const balance = await getPointsBalance(branchAddress);
      console.log("Points balance retrieved:", balance);
      setBalance(balance);
    } catch (error) {
      console.error('Error getting points balance:', error);
    }
  };

  return (
    <div className="container">
      <h1>Tokenization and Ethereum Integration</h1>

      <form onSubmit={(e) => { e.preventDefault(); handleReward(branchAddress); }}>
        <p>Set your branch bank address</p>
        <input
          type="text"
          value={branchAddress}
          onChange={(e) => setBranchAddress(e.target.value)}
        />
        <button type="submit">Reward Branch</button>
      </form>

      <button onClick={handleConvert}>Convert 1 Token to Points</button>

      <form onSubmit={(e) => { e.preventDefault(); handleRedeem(); }}>
        <p>Set Your Points</p>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
        <p>Set the Reward</p>
        <input
          type="text"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
        <button type="submit">Redeem Points</button>
      </form>

      <button onClick={handleGetBalance}>Get Points Balance</button>
      <div className="balance-display">
        <p>Your Points Balance: {String(balance)}</p>
      </div>
    </div>
  );
}

export default App;
