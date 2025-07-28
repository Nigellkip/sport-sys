import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    teams: 0,
    players: 0,
    matches: 0,
    fixtures: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [teams, players, matches, fixtures] = await Promise.all([
          api.getTeams(),
          api.getPlayers(),
          api.getMatches(),
          api.getFixtures()
        ]);
        
        setStats({
          teams: teams.length,
          players: players.length,
          matches: matches.length,
          fixtures: fixtures.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Teams', value: stats.teams, icon: '👥', color: '#4CAF50' },
    { title: 'Players', value: stats.players, icon: '🏃‍♂️', color: '#2196F3' },
    { title: 'Matches', value: stats.matches, icon: '⚽', color: '#FF9800' },
    { title: 'Fixtures', value: stats.fixtures, icon: '📅', color: '#9C27B0' }
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your Sports Management System</p>
      </div>
      
      <div className="stats-grid">
        {statCards.map((stat) => (
          <div key={stat.title} className="stat-card" style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>🏆 Sports Management System</h2>
          <p>Manage your teams, players, matches, and fixtures all in one place.</p>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">👥</span>
              <span>Create and manage teams</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🏃‍♂️</span>
              <span>Register and track players</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚽</span>
              <span>Schedule and monitor matches</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📅</span>
              <span>Organize fixtures and announcements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
