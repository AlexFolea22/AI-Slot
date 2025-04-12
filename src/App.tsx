import React, { useState } from 'react';
import './App.css';
import ChatBox from './components/ChatBox';
import SlotMachine from './components/SlotMachine';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <h1>AI Slot</h1> */}
      <SlotMachine />
    </div>
  );
};

export default App;

