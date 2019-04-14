/**
 * how many players will go on this quest, in the format of [questNum][total # players - 5]
 * ex: PLAYERS_ON_QUEST[0][0] = the first quest, with a 5 player game, will have 2 people on the Quest
 * @const {[][]}
 */
const PLAYERS_ON_QUEST = [
  //5 6 7 8 9 10 players
  [2, 2, 2, 3, 3, 3],
  [3, 3, 3, 4, 4, 4],
  [2, 4, 3, 4, 4, 4],
  [3, 3, 4, 5, 5, 5],
  [3, 4, 4, 5, 5, 5]
];

module.exports = class Quest {
  /**
   * Quest objects have:
   * @property {number} questNum - which quest players are on from 1 to 5
   * @property {number} teamSize - size of current quest’s team, based on below table
   * @property {number} voteTrack - how many failed votes have been for current quest, between 0 and 5
   * @property {Player} questLeader - the player leading the current quest
   * @property {Player[]} team - a list containing teamSize objects representing players
   * @property {boolean} needsTwoFails - true if this quest requires 2 failing votes to fail, false if it only needs 1 (false by default)
   * @property {boolean} success - true for a succeeded quest, false for failed quest
   */

  constructor(questNum, totalNumPlayers) {
    this.questNum = questNum;
    this.totalNumPlayers = totalNumPlayers;
    this.playersRequired = Quest.PLAYERS_ON_QUEST[questNum - 1][totalNumPlayers - 5];
    this.playersOnQuest = { size: 0, players: new Set([]) };
    this.playersNeededLeft = this.playersRequired;
    this.voteTrack = 1;
    this.questLeader = '';
    this.questTeamDecisions = {
      'voted': [],
      'accept': [],
      'reject': []
    };
    this.currentQuest = false;
    this.needsTwoFails = false; // don't worry about this for now, we'll just have it always set to false since it's a "special case" rule
    this.success = null;
  }

  // getter for PlayerIdentities
  static get PLAYERS_ON_QUEST() {
    return PLAYERS_ON_QUEST;
  }
}