const axios = require('axios');

function sendVotes(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                resolve(`statusCode: ${res.statusCode}`)
            })
            .catch(error => {
                reject(error);
            })
    });
}

module.exports.netService = {
    sendVotes: sendVotes
}