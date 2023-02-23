const axios = require('axios');
const config = require('./app.config.json');


//Broadcasts vote to multiple nodes in the block chain network
// What is the protocol for when some nodes have not responded/ recieved a transmission
function transmitVoteBlock(data) {
    config.network.nodes.forEach((node) => {
        axios.post(node, data).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        });
    });
}

module.exports.netService = {
    transmitVoteBlock: transmitVoteBlock
}