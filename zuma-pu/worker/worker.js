const { database } = require('../app.data');
const { netService } = require('../app.network')
const { ipcRenderer } = require('electron');
const config = require('../app.config.json');

let votePacksCache = [];

//Handles event when worker window is loaded
window.addEventListener("load", e => {
    initialiseAppResources();
});

// Handles event when voter has completed casting thier vote in every ballot
ipcRenderer.on('votepack-completed', (e, votePack) => {
    if (votePack) {
        votePacksCache.push(votePack);
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

//
function initialiseAppResources() {
    database.createVotesTable();
    database.createIncidentsTable();
    setInterval(() => {
        config.Network.nodes.forEach((node) => {
            netService.sendVotePacks(node, votePacksCache).then(() => {
                // logic to handle vote transmission errors etc, logs etc 
            });
        });
    }, config.network.transmitInterval);
}