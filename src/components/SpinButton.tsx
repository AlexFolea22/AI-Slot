import React, { FC } from 'react';

interface SpinButtonProps {
  onSpin: () => void;
}

const SpinButton: FC<SpinButtonProps> = ({ onSpin }) => {
  return <button onClick={onSpin}>Spin!</button>;
};

export default SpinButton;
