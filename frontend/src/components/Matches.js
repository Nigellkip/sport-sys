import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './Matches.css';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    team1Id: '',
    team2Id: '',
    date: '',
    venue: '',
    status: 'scheduled'
  });

  const statusOptions = ['scheduled', 'ongoing', 'completed', 'cancelled'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [matchesData, teamsData] = await Promise.all([
        api.getMatches(),
        api.getTeams()
      ]);
      setMatches(matchesData);
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
      await api.createMatch(formData);
      setFormData({ id: '', team1Id: '', team2Id: '', date: '', venue: '', status: 'scheduled' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating match:', error);
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
    return team ? team.name : 'Unknown Team';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#2196F3';
      case 'ongoing': return '#FF9800';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#f44336';
      default: return '#666';
    }
  };

  if (loading) {
    return <div className="loading">Loading matches...</div>;
  }

  return (
    <div className="matches">
      <div className="matches-header">
        <h1>Matches Management</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Schedule New Match'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="match-form">
            <h3>Schedule New Match</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="id">Match ID:</label>
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
                <label htmlFor="date">Date & Time:</label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="team1Id">Home Team:</label>
                <select
                  id="team1Id"
                  name="team1Id"
                  value={formData.team1Id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Home Team</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="team2Id">Away Team:</label>
                <select
                  id="team2Id"
                  name="team2Id"
                  value={formData.team2Id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Away Team</option>
                  {teams.filter(team => team.id !== formData.team1Id).map(team => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="venue">Venue:</label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  placeholder="Stadium or venue name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Schedule Match
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

      <div className="matches-content">
        {matches.length === 0 ? (
          <div className="empty-state">
            <h3>No matches scheduled</h3>
            <p>Schedule your first match to get started!</p>
          </div>
        ) : (
          <div className="matches-grid">
            {matches.map(match => (
              <div key={match.id} className="match-card">
                <div className="match-header">
                  <span className="match-id">#{match.id}</span>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(match.status) }}
                  >
                    {match.status}
                  </span>
                </div>
                <div className="match-teams">
                  <div className="team home-team">
                    <span className="team-name">{getTeamName(match.team1Id)}</span>
                    <span className="team-label">HOME</span>
                  </div>
                  <div className="vs-divider">VS</div>
                  <div className="team away-team">
                    <span className="team-name">{getTeamName(match.team2Id)}</span>
                    <span className="team-label">AWAY</span>
                  </div>
                </div>
                <div className="match-details">
                  <div className="detail-item">
                    <span className="detail-icon">📅</span>
                    <span>{formatDate(match.date)}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-icon">📍</span>
                    <span>{match.venue || 'TBD'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;
