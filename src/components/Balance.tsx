import React from 'react';

interface BalanceProps {
  balance: number;
  spincost: number;
  increaseBet: () => void;
  decreaseBet: () => void;
}

const Balance: React.FC<BalanceProps> = ({ balance, spincost, increaseBet, decreaseBet }) => {
  return (
    <div className="balance">
      <h2>Balance: {balance.toFixed(2)} $</h2>
      <div className="spin-cost">
        <button onClick={decreaseBet}>-</button>
        <h2>Cost per Spin: {spincost} $</h2>
        <button onClick={increaseBet}>+</button>
      </div>
    </div>
  );
};

export default Balance;
