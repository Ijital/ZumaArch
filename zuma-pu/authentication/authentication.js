const { ipcRenderer } = require('electron');
const { database } = require('../app.data');

function activateAuthentication() {
    document.getElementById('screen-active').style.display = 'block';
    document.getElementById('screen-sleep').style.display = 'none';
    document.body.style.backgroundColor = 'white';
}

// Authenticates a voter
function authenthicate() {
    let voter = getVoterInfo()
    database.voterHasVoted(voter.vin).then((e) => {
           // alert(e);   
            // Send voter unauthorized here
    });
    ipcRenderer.send('voter-authorized', voter.vin, voter.pu, voter.age, voter.gender, voter.job);
}

// Gets voter information
function getVoterInfo() {
    return {
        "vin": 1,
        "pu": "tine",
        "gender": "m",
        "job": "developer",
        "age": 44,
    };
}