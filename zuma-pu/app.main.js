//Required imports
const { AppWindow, VoteBlock } = require('./app.models');
const { app, ipcMain } = require('electron');

// Application windows
let menuWindow;
let loginWindow;
let ballotWindow;
let reportWindow;
let workerWindow;
let voterAuthWindow;

// Current Vote block being processed
let voteBlock;

// Handles event when application is ready
app.on('ready', ()=> {
    menuWindow = new AppWindow('menu');
    menuWindow.webContents.on('did-finish-load', () => {
        workerWindow = new AppWindow('worker', menuWindow);
        setTimeout(() => {
            loginWindow = new AppWindow('login', menuWindow);
        }, 2000);
        menuWindow.on('close', () => {
            workerWindow.webContents.send('app-ready-to-quit');
            app.quit();
        })
    });
});

// Handles even when Admin user has logged in
ipcMain.on('admin-login', () => {
    menuWindow.webContents.send('admin-login');
});


// Handles event when voter has confirmed an election vote
ipcMain.on('ballot-submitted', (e, election, partyVoted) => {
    //console.log(election, partyVoted);
    voteBlock.updateVoteBlock(election, partyVoted);
});


// Handles event when voter has submitted all thier e-ballots
ipcMain.on('vote-completed', () => {
    workerWindow.webContents.send('vote-completed', voteBlock);
});


// Handles event when voter portal is selected
ipcMain.on('voter-portal-selected', () => {
    voterAuthWindow = new AppWindow('authentication', menuWindow); 
});


// Handles event when a voter has been authenticated
ipcMain.on('voter-authenticated', (e, id, pu, age, gender, occupation) => {
    voteBlock = new VoteBlock(id, pu, age, gender, occupation);
    ballotWindow = new AppWindow('ballot', voterAuthWindow);
});


// Handles event when election report portal is selected
ipcMain.on('report-portal-selected', () => {
    reportWindow = new AppWindow('reports', menuWindow);
});