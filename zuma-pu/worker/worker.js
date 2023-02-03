const { database } = require('../app.data');
const { netService } = require('../app.network')
const { ipcRenderer } = require('electron');
const config = require('../app.config.json');

let voteBlocksCache = [];


//Handles event when worker window is loaded
window.addEventListener("load", e => {
    database.openDatabase();
    setInterval(() => {
        config.Network.nodes.forEach((node) => {
            netService.sendVotes(node, voteBlocksCache).then(() => { 
                // logic to handle vote transmission errors etc, logs etc 
            });
        });
    }, config.Network.transmissionInterval);
});

// Handles event when voter has completed casting a vote in every ballot
ipcRenderer.on('vote-completed', (e, voteBlock) => {
    //if (voteBlock) {
        voteBlocksCache.push(voteBlock);
        database.saveVote(Object.values(voteBlock));
   // }
});

// Handles event when application is about to quit
ipcRenderer.on('app-ready-to-quit', e => {
    database.closeDatabase();
});
