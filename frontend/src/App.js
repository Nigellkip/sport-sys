import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Teams from './components/Teams';
import Players from './components/Players';
import Matches from './components/Matches';
import Fixtures from './components/Fixtures';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'teams':
        return <Teams />;
      case 'players':
        return <Players />;
      case 'matches':
        return <Matches />;
      case 'fixtures':
        return <Fixtures />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
