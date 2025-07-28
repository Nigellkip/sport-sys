const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const Team = require('./models/team');
const Player = require('./models/player');
 const Match = require('./models/match');
const Fixture = require('./models/fixture'); // Import the Fixture model

let teams = [];
let players = [];
let matches = [];
let fixtures = [];
// Create a fixture 
app.post('/fixtures', (req, res) => {
  const { id, matchId, announcement } = req.body;
  const fixture = new Fixture(id, matchId, announcement);
  fixtures.push(fixture);
  res.status(201).json(fixture);
});
// List all fixtures
app.get('/fixtures', (req, res) => {
  res.json(fixtures);
});
// Create a team
app.post('/teams', (req, res) => {
  const { id, name, captainId } = req.body;
  const team = new Team(id, name, captainId);
  teams.push(team);
  res.status(201).json(team);
});

// List all teams
app.get('/teams', (req, res) => {
  res.json(teams);
});

// Register a player
app.post('/players', (req, res) => {
  const { id, name, teamId, position } = req.body;
  const player = new Player(id, name, teamId, position);
  players.push(player);
  res.status(201).json(player);
});

// List all players
app.get('/players', (req, res) => {
  res.json(players);
});
//create a match
app.post('/matches', (req, res) => {
  const { id, date, homeTeamId, awayTeamId, lineup, score } = req.body;
  const match = new Match(id, date, homeTeamId, awayTeamId, lineup, score);
  matches.push(match);
  res.status(201).json(match);
});
// List all matches
app.get('/matches', (req, res) => {
  res.json(matches);
});
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
