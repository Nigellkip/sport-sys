import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './Teams.css';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    captainId: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamsData, playersData] = await Promise.all([
        api.getTeams(),
        api.getPlayers()
      ]);
      setTeams(teamsData);
      setPlayers(playersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createTeam(formData);
      setFormData({ id: '', name: '', captainId: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getCaptainName = (captainId) => {
    const captain = players.find(player => player.id === captainId);
    return captain ? captain.name : 'No Captain';
  };

  const getTeamPlayers = (teamId) => {
    return players.filter(player => player.teamId === teamId);
  };

  if (loading) {
    return <div className="loading">Loading teams...</div>;
  }

  return (
    <div className="teams">
      <div className="teams-header">
        <h1>Teams Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add New Team'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="team-form">
            <h3>Create New Team</h3>
            <div className="form-group">
              <label htmlFor="id">Team ID:</label>
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
              <label htmlFor="name">Team Name:</label>
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
              <label htmlFor="captainId">Captain:</label>
              <select
                id="captainId"
                name="captainId"
                value={formData.captainId}
                onChange={handleInputChange}
              >
                <option value="">Select Captain</option>
                {players.map(player => (
                  <option key={player.id} value={player.id}>
                    {player.name} (ID: {player.id})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Create Team
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

      <div className="teams-grid">
        {teams.length === 0 ? (
          <div className="empty-state">
            <h3>No teams found</h3>
            <p>Create your first team to get started!</p>
          </div>
        ) : (
          teams.map(team => (
            <div key={team.id} className="team-card">
              <div className="team-header">
                <h3>{team.name}</h3>
                <span className="team-id">ID: {team.id}</span>
              </div>
              <div className="team-info">
                <div className="captain-info">
                  <strong>Captain:</strong> {getCaptainName(team.captainId)}
                </div>
                <div className="players-count">
                  <strong>Players:</strong> {getTeamPlayers(team.id).length}
                </div>
              </div>
              <div className="team-players">
                <h4>Team Roster:</h4>
                {getTeamPlayers(team.id).length === 0 ? (
                  <p className="no-players">No players registered</p>
                ) : (
                  <ul className="players-list">
                    {getTeamPlayers(team.id).map(player => (
                      <li key={player.id} className="player-item">
                        <span className="player-name">{player.name}</span>
                        <span className="player-position">{player.position}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Teams;
