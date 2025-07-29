class Fixture {
  constructor(id, matchId, announcement) {
    this.id = id;
    this.matchId = matchId;
    this.announcement = announcement; // e.g., "Matchday 1: Team A vs Team B"
  }
}

module.exports = Fixture;