const axios = require('axios');

function sendVote(url, data) {
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
    publishVote: sendVote
}