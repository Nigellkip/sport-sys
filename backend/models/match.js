class Match {
  constructor(id, date, homeTeamId, awayTeamId, lineup = [], score = { home: 0, away: 0 }) {
    this.id = id;
    this.date = date;
    this.homeTeamId = homeTeamId;
    this.awayTeamId = awayTeamId;
    this.lineup = lineup; // Array of player IDs
    this.score = score;   // { home: Number, away: Number }
  }
}

module.exports = Match;