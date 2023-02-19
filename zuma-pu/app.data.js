const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbSchema = {
    Votes: `(Vin,VoterPU,VoterAge,VoterGender,VoterOccupation,VoteDate,
            VoteLocation,VoteForPresident,VoteForSenate,VoteForReps,VoteForGovernor,VoteForAssembly)`,
    Users: `(Username, Password)`,
    Incidents: `(VoterId, IncidentSummary)`
}

let log = console.log;

// initialises the database connection
const db = new sqlite3.Database(path.resolve(__dirname, 'zuma.db'), sqlite3.OPEN_READWRITE, er => {
    er ? log(er.message) :log('Database opened');
});

// Opens connection to in memory database.
function openDataCache() {
    dbCache = new sqlite3.Database(':memory:', er => {
        er ? log(er.message) : log('In-memory SQlite connected');
    });
}

// Closes connection to local database
function close() {
    db.close(er => {
        er ? log(er.message) : log('Database closed');
    });
}

// Checks if a given table already exists
function tableExist(tableName) {
    return new Promise((resolve, reject) => {
        let sql = `select name FROM sqlite_master WHERE type='table'AND name="${tableName}"`;
        db.get(sql, [], (er, row) => {
            er ? reject(er.message) : resolve(row ? true : false);
        });
    });
}

// Creates Votes Table
function createVotesTable() {
    return new Promise((resolve, reject) => {
        let sql = `create table Votes ${dbSchema.Votes}`;
        db.run(sql, [], er => {
            er ? reject(er.message) : resolve('Votes Table created');
        });
    });
}

// Creates Incidents Table
function createIncidentsTable() {
    return new Promise((resolve, reject) => {
        let sql = `create table Incidents ${dbSchema.Incidents}`;
        db.run(sql, [], er => {
            er ? reject(er.message) : resolve('Incidents Table created');
        });
    });
}

// Adds a new vote to local database
function insertVote(voteValues) {
    return new Promise((resolve, reject) => {
        let sql = `insert into Votes ${dbSchema.Votes} Values(?,?,?,?,?,?,?,?,?,?,?,?)`;
        db.run(sql, voteValues, er => {
            er ? reject(er.message) : resolve('Vote Saved');
        });
    });
}

// Adds a new incident to local database
function insertIncident(voterId, summary) {
    return new Promise((resolve, reject) => {
        let sql = `insert into Incidents ${dbSchema.Incidents} Values(?,?)`;
        db.run(sql, [voterId, summary], er => {
            er ? reject(er.message) : resolve('Incident Saved');
        });
    });
}


// Gets all votes 
function getAllVotePacks() {
    return new Promise((resolve, reject) => {
        let sql = 'select * from Votes';
        db.all(sql, [], (er, rows) => {
            er ? reject(er.message) : resolve(rows);
        });
    });
}


// Checks if a record exists
function voterHasVoted(vin) {
    return new Promise((resolve, reject) => {
        let sql = `select Vin from Votes where Vin = ${vin}`;
        db.get(sql, [], (er, row) => {
            er ? reject(er.message) : resolve(row ? true : false);
        });
    });
}

// Module exports
module.exports.database = {
    close: close,
    createVotesTable: createVotesTable,
    saveVote: insertVote,
    getAllVotePacks: getAllVotePacks,
    voterHasVoted: voterHasVoted,
    createIncidentsTable: createIncidentsTable,
    insertIncident: insertIncident,
    tableExists: tableExist
}