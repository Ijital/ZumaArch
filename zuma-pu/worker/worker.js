const { database } = require('../app.data');
const { netService } = require('../app.network')
const { ipcRenderer } = require('electron');
const config = require('../app.config.json');

let voteBlocksCache = [];
database.openDatabase();

ipcRenderer.on('vote-completed', (e, voteBlock) => {
    if (voteBlock) {
        voteBlocksCache.push(voteBlock);
        database.saveVote(Object.values(voteBlock));
    }
});

ipcRenderer.on('app-ready-to-quit', e => {
    database.closeDatabase();
});

setInterval(() => {
    config.Network.Nodes.forEach((node) => {
        netService.publishVote(node, voteBlocksCache).then(() => {
        });
    });
}, config.Network.Interval);