const { database } = require('../app.data');
const { netService } = require('../app.network')
const { ipcRenderer } = require('electron');
const config = require('../app.config.json');

let pendingVotePacks = [];
let queuedPendingVotePacks = [];

//Handles event when worker window is loaded
window.addEventListener("load", e => {
    initialiseAppResources();
});

// Handles event when voter has completed casting thier vote in every ballot
ipcRenderer.on('votepack-completed', (e, votePack) => {
    if (votePack) {
        pendingVotePacks.push(votePack);
        database.saveVote(Object.values(votePack));
    }
});

// Handles event when application is about to quit
ipcRenderer.on('app-ready-to-quit', e => {
    database.close();
});

// Handles event voter has not been authorise
ipcRenderer.on('voter-unauthorized', (e, voterId) => {
    database.insertIncident(voterId);
})

//Initiates Application resources
function initialiseAppResources() {
    database.createVotesTable();
    database.createIncidentsTable();
    setInterval(() => mineVoteBlock(), config.network.transmitInterval);
}

// Transmit votes to block chain nodes
function mineVoteBlock() {
    if (pendingVotePacks.length > 1) {
        queuedPendingVotePacks = pendingVotePacks;
        pendingVotePacks = [];  
    }
    netService.transmitVoteBlock(JSON.stringify(queuedPendingVotePacks));
}