import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './Players.css';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    teamId: '',
    position: ''
  });

  const positions = [
    'Goalkeeper', 'Defender', 'Midfielder', 'Forward',
    'Center Back', 'Full Back', 'Wing Back', 'Defensive Midfielder',
    'Central Midfielder', 'Attacking Midfielder', 'Winger', 'Striker'
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [playersData, teamsData] = await Promise.all([
        api.getPlayers(),
        api.getTeams()
      ]);
      setPlayers(playersData);
      setTeams(teamsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createPlayer(formData);
      setFormData({ id: '', name: '', teamId: '', position: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating player:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getTeamName = (teamId) => {
    const team = teams.find(team => team.id === teamId);
    return team ? team.name : 'No Team';
  };

  const groupPlayersByTeam = () => {
    const grouped = {};
    players.forEach(player => {
      const teamId = player.teamId || 'unassigned';
      if (!grouped[teamId]) {
        grouped[teamId] = [];
      }
      grouped[teamId].push(player);
    });
    return grouped;
  };

  if (loading) {
    return <div className="loading">Loading players...</div>;
  }

  const groupedPlayers = groupPlayersByTeam();

  return (
    <div className="players">
      <div className="players-header">
        <h1>Players Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Register New Player'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="player-form">
            <h3>Register New Player</h3>
            <div className="form-group">
              <label htmlFor="id">Player ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Player Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="teamId">Team:</label>
              <select
                id="teamId"
                name="teamId"
                value={formData.teamId}
                onChange={handleInputChange}
              >
                <option value="">Select Team</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="position">Position:</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Position</option>
                {positions.map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Register Player
              </button>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="players-content">
        {players.length === 0 ? (
          <div className="empty-state">
            <h3>No players found</h3>
            <p>Register your first player to get started!</p>
          </div>
        ) : (
          <div className="teams-sections">
            {Object.entries(groupedPlayers).map(([teamId, teamPlayers]) => (
              <div key={teamId} className="team-section">
                <h2 className="team-title">
                  {teamId === 'unassigned' ? '🏃‍♂️ Unassigned Players' : `👥 ${getTeamName(teamId)}`}
                  <span className="player-count">({teamPlayers.length} players)</span>
                </h2>
                <div className="players-grid">
                  {teamPlayers.map(player => (
                    <div key={player.id} className="player-card">
                      <div className="player-avatar">
                        🏃‍♂️
                      </div>
                      <div className="player-info">
                        <h3>{player.name}</h3>
                        <p className="player-id">ID: {player.id}</p>
                        <div className="player-details">
                          <span className="position-badge">{player.position}</span>
                          {player.teamId && (
                            <span className="team-badge">{getTeamName(player.teamId)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Players;
