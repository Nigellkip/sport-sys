import React from 'react';
import './Navigation.css';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'teams', label: 'Teams', icon: '👥' },
    { id: 'players', label: 'Players', icon: '🏃‍♂️' },
    { id: 'matches', label: 'Matches', icon: '⚽' },
    { id: 'fixtures', label: 'Fixtures', icon: '📅' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-header">
        <h2>🏆 Sports Manager</h2>
      </div>
      <ul className="nav-list">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              <span className="nav-label">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
