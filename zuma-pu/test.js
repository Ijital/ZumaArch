const data = require('./election-schema.json')

let nums = [];

//data.LocalGovts[7].forEach((lg) => console.log(data.States[7], lg.name));

for (var i = 1; i < 38; i++) {
    data.LocalGovts[i].forEach((lg) => console.log(data.States[i], lg.name));
}
