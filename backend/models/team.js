class Team {
  constructor(id, name, captainId) {
    this.id = id;
    this.name = name;
    this.captainId = captainId; // playerId of the captain
  }
}

module.exports = Team;