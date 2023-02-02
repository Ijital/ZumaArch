var { database } = require('../app.data.service.js');
const Swal = require('sweetalert2')

async function getResult(election) {
    var result = await database.report(election);
}
