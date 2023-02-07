const sqlite3 = require('sqlite3').verbose();
const electionConfig = require('./election.config.json');
const path = require('path');
const dbSchema = {
    Votes: `(VoterId,VoterPU,VoterAge,VoterGender,VoterOccupation,VoteId,VoteDate,VoteLocation,VoteForPresident,VoteForSenate,VoteForReps,VoteForGovernor,VoteForAssembly)`,
    Users: `(Username, Password)`,
    Incidents: `(VoterId, IncidentSummary)`
}

let db;
let dbCache;
let log = console.log;


// Opens connection to in memory database.
function openDataCache() {
    dbCache = new sqlite3.Database(':memory:', er => {
        er ? log(er.message) : log('In-memory SQlite connected');
    });
}

// Opens connection to local database
function openDatabase() {
    db = new sqlite3.Database(path.resolve(__dirname, 'zuma.db'), sqlite3.OPEN_READWRITE, er => {
        er ? log(er.message) : log('Database opened');
    });
}

// Closes connection to local database
function closeDatabase() {
    db.close(er => {
        er ? log(er.message) : log('Database closed');
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
        let sql = `insert into Votes ${dbSchema.Votes} Values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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
function getAllVotes() {
    return new Promise((resolve, reject) => {
        let sql = 'select * from Votes';
        db.all(sql, [], (er, rows) => {
            er ? reject(er.message) : resolve(rows);
        });
    });
}

// Gets the report of a given election at the polling unit
function getElectionReport(election) {
    return new Promise((resolve, reject) => {
        let report = {};
        electionConfig.elections.forEach((party, index) => {
            let sql = `select count(*) VoteCount from Votes where ${election} = "${party.Acronym}"`;
            db.get(sql, [], (er, row) => {
                er ? reject(er.message) : report[party.Acronym] = row.VoteCount;
                if (index === config.Parties.length - 1) { resolve(report); }
            });
        });
    });
}

// Checks if a record exists
function voterHasVoted(voterId) {
    return new Promise((resolve, reject) => {
        let sql = `select VoterId from Votes where VoterId = ${voterId}`;
        db.get(sql, [], (er, row) => {
            er ? reject(er.message) : resolve(row ? true : false);
        });
    });
}

// Modules exports
module.exports.database = {
    createVotesTable: createVotesTable,
    saveVote: insertVote,
    report: getElectionReport,
    getVotes: getAllVotes,
    openDatabase: openDatabase,
    closeDatabase: closeDatabase,
    voterHasVoted:voterHasVoted,
    createIncidentsTable:createIncidentsTable,
    insertIncident:insertIncident   
}