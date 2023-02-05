const { database } = require('../app.data');
const { netService } = require('../app.network')
const { ipcRenderer } = require('electron');
const config = require('../app.config.json');

let voteBlocksCache = [];

//Handles event when worker window is loaded
window.addEventListener("load", e => {
   initialiseAppResources();
});

// Handles event when voter has completed casting thier vote in every ballot
ipcRenderer.on('vote-completed', (e, voteBlock) => {
    if (voteBlock) {
        voteBlocksCache.push(voteBlock);
        database.saveVote(Object.values(voteBlock));
    }
});

// Handles event when application is about to quit
ipcRenderer.on('app-ready-to-quit', e => {
    database.closeDatabase();
});

// Handles event voter has not been authorise
ipcRenderer.on('voter-unauthorized', (e, voterId) => {
    reportIncident(voterId);
})


// Reports Incident
function reportIncident(voterId) {
    database.insertIncident(voterId);
}

//
function initialiseAppResources(){
    database.openDatabase();
    database.initVotesTable();
    database.createIncidentsTable();
    setInterval(() => {
        config.Network.nodes.forEach((node) => {
            netService.sendVotes(node, voteBlocksCache).then(() => {
                // logic to handle vote transmission errors etc, logs etc 
            });
        });
    }, config.network.transmitInterval);
}