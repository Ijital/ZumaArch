const { database } = require('../app.data');
const config = require('../app.config.json');
let totalVotePacks = [];
let results = [];

//Handles event when worker window is loaded
window.addEventListener("load", e => {
    database.getAllVotePacks().then((votePacks) => {
        totalVotePacks = votePacks;
        getGeneralElectionResults();
        setResults();
    });
});

//
function getGeneralElectionResults() {
    config.parties.forEach((party) => {
        getPartyVotesForAllElections(party.acronym);
    });
}

// Gets the vote count for every election for the given party
function getPartyVotesForAllElections(party) {
    let partyResults = {};
    partyResults['Party'] = party;
    config.elections.forEach((election) => {
        partyResults[election.title] = GetPartyVoteCountForElection(election.title, party);
    });
    results.push(partyResults);
}

// Gets the vote count for a given party in the given election
function GetPartyVoteCountForElection(election, party) {
    var r = totalVotePacks.filter(function (votePack) {
        return votePack[election] === party;
    });
    return r.length;
}

// Renders the election results for all parties
function setResults() {
    resultsTableBody = document.getElementById('table-body');
    results.forEach((result) => {
        let tabRow = document.createElement('tr');
        tabRow.innerHTML =
        `<td><img src="../assets/img/Parties/${result.Party}.jpg" 
          width="25">${result.Party} </td>
          <td>${result.VoteForPresident}</td>
          <td>${result.VoteForSenate}</td>
          <td>${result.VoteForReps}</td>
          <td>${result.VoteForGovernor}</td>
          <td>${result.VoteForAssembly}</td>`;
        resultsTableBody.appendChild(tabRow);
    });
}