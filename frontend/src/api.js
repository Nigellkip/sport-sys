const API_BASE_URL = 'http://localhost:3000';

// API service functions
export const api = {
  // Teams
  getTeams: async () => {
    const response = await fetch(`${API_BASE_URL}/teams`);
    return response.json();
  },
  
  createTeam: async (team) => {
    const response = await fetch(`${API_BASE_URL}/teams`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(team),
    });
    return response.json();
  },

  // Players
  getPlayers: async () => {
    const response = await fetch(`${API_BASE_URL}/players`);
    return response.json();
  },
  
  createPlayer: async (player) => {
    const response = await fetch(`${API_BASE_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    return response.json();
  },

  // Matches
  getMatches: async () => {
    const response = await fetch(`${API_BASE_URL}/matches`);
    return response.json();
  },
  
  createMatch: async (match) => {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(match),
    });
    return response.json();
  },

  // Fixtures
  getFixtures: async () => {
    const response = await fetch(`${API_BASE_URL}/fixtures`);
    return response.json();
  },
  
  createFixture: async (fixture) => {
    const response = await fetch(`${API_BASE_URL}/fixtures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fixture),
    });
    return response.json();
  },
};
