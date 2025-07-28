import React, { useState, useEffect } from 'react';
import { api } from '../api';
import './Fixtures.css';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    matchId: '',
    announcement: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [fixturesData, matchesData, teamsData] = await Promise.all([
        api.getFixtures(),
        api.getMatches(),
        api.getTeams()
      ]);
      setFixtures(fixturesData);
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
      await api.createFixture(formData);
      setFormData({ id: '', matchId: '', announcement: '' });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Error creating fixture:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const getMatchDetails = (matchId) => {
    const match = matches.find(match => match.id === matchId);
    if (!match) return { display: 'Unknown Match', teams: '' };
    
    const team1 = teams.find(team => team.id === match.team1Id);
    const team2 = teams.find(team => team.id === match.team2Id);
    
    return {
      display: `${team1?.name || 'Team 1'} vs ${team2?.name || 'Team 2'}`,
      teams: `${team1?.name || 'Team 1'} vs ${team2?.name || 'Team 2'}`,
      date: match.date,
      venue: match.venue,
      status: match.status
    };
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

  if (loading) {
    return <div className="loading">Loading fixtures...</div>;
  }

  return (
    <div className="fixtures">
      <div className="fixtures-header">
        <h1>Fixtures & Announcements</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create New Fixture'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit} className="fixture-form">
            <h3>Create New Fixture</h3>
            <div className="form-group">
              <label htmlFor="id">Fixture ID:</label>
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
              <label htmlFor="matchId">Match:</label>
              <select
                id="matchId"
                name="matchId"
                value={formData.matchId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Match</option>
                {matches.map(match => (
                  <option key={match.id} value={match.id}>
                    {getMatchDetails(match.id).display} - {formatDate(match.date)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="announcement">Announcement:</label>
              <textarea
                id="announcement"
                name="announcement"
                value={formData.announcement}
                onChange={handleInputChange}
                placeholder="Enter fixture announcement or important information..."
                rows="4"
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Create Fixture
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

      <div className="fixtures-content">
        {fixtures.length === 0 ? (
          <div className="empty-state">
            <h3>No fixtures found</h3>
            <p>Create your first fixture announcement to get started!</p>
          </div>
        ) : (
          <div className="fixtures-list">
            {fixtures.map(fixture => {
              const matchDetails = getMatchDetails(fixture.matchId);
              return (
                <div key={fixture.id} className="fixture-card">
                  <div className="fixture-header">
                    <div className="fixture-info">
                      <h3>{matchDetails.teams}</h3>
                      <span className="fixture-id">Fixture #{fixture.id}</span>
                    </div>
                    <div className="match-info">
                      <div className="match-detail">
                        <span className="detail-icon">📅</span>
                        <span>{formatDate(matchDetails.date)}</span>
                      </div>
                      {matchDetails.venue && (
                        <div className="match-detail">
                          <span className="detail-icon">📍</span>
                          <span>{matchDetails.venue}</span>
                        </div>
                      )}
                      <div className="match-detail">
                        <span 
                          className="status-indicator"
                          style={{
                            backgroundColor: 
                              matchDetails.status === 'scheduled' ? '#2196F3' :
                              matchDetails.status === 'ongoing' ? '#FF9800' :
                              matchDetails.status === 'completed' ? '#4CAF50' : '#f44336'
                          }}
                        ></span>
                        <span>{matchDetails.status}</span>
                      </div>
                    </div>
                  </div>
                  <div className="fixture-announcement">
                    <h4>📢 Announcement</h4>
                    <p>{fixture.announcement}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fixtures;
