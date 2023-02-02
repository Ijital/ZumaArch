const { ipcRenderer } = require('electron');
const { VoteBlock } = require('../app.models');


function authenthicate() {
    let voter = getVoterInfo()
    ipcRenderer.send('voter-authenticated', voter.vin, voter.pu, voter.age, voter.gender, voter.job);
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