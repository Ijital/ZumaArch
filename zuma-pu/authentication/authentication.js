const { ipcRenderer } = require('electron');
const { database } = require('../app.data');
const { VoteBlock } = require('../app.models');
const { VoteBlock } = require('../app.models');

// Authenticates a voter
function authenthicate() {
    let voter = getVoterInfo()
    if (database.voterHasVoted(voter.vin)) {
        ipcRenderer.send('voter-authorized', voter.vin, voter.pu, voter.age, voter.gender, voter.job);
    }
    else {
        ipcRenderer.send('voter-unauthorized', voter.vin, voter.pu, voter.age, voter.gender, voter.job);
    }
}


// Gets voter information
function getVoterInfo() {
    return {
        "vin": 1,
        "pu": "tine",
        "gender": "m",
        "job": "developer",
        "age": 44
    };
}