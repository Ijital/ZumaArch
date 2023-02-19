//Required imports
const { AppWindow, VotePack } = require('./app.models');
const { app, ipcMain } = require('electron');

// Application windows
let menuWindow;
let loginWindow;
let ballotWindow;
let reportWindow;
let workerWindow;
let voterAuthWindow;

// Vote pack being processed for the current voter
let votePack;

// Handles event when application is ready
app.on('ready', e => {
    menuWindow = new AppWindow('menu');
    menuWindow.webContents.on('did-finish-load', e => {
        workerWindow = new AppWindow('worker', menuWindow);
        setTimeout(() => {
            loginWindow = new AppWindow('login', menuWindow);
        }, 2000);
        menuWindow.on('close', e => {
            workerWindow.webContents.send('app-ready-to-quit');
            app.quit();
        })
    });
});

// Handles event when Admin user has logged in
ipcMain.on('admin-login', e => {
    menuWindow.webContents.send('admin-login');
});

// Handles event when voter portal is selected
ipcMain.on('voter-portal-selected', e => {
    voterAuthWindow = new AppWindow('authentication', menuWindow);
});

// Handles event when voter has been authorised
ipcMain.on('voter-authorized', (e, id, pu, age, gender, occupation) => {
    votePack = new VotePack(id, pu, age, gender, occupation);
    ballotWindow = new AppWindow('ballot', voterAuthWindow);
});

// Handles event when a voter has not been authorised
ipcMain.on('voter-unauthorized', (e, id) => {
    workerWindow.webContents.send('voter-unauthorized', id);
});

// Handles event when voter has confirmed thier vote on a ballot
ipcMain.on('ballot-vote-submitted', (e, election, partyVoted) => {
    votePack.setBallotVote(election, partyVoted);
});

// Handles event when voter has submitted all thier ballots
ipcMain.on('ballot-votes-completed', e => {
    workerWindow.webContents.send('votepack-completed', votePack);
    voterAuthWindow.webContents.reloadIgnoringCache();
    setTimeout(() => ballotWindow.close(), 2000);
});

// Handles event when election report portal is selected
ipcMain.on('report-portal-selected', e => {
    reportWindow = new AppWindow('reports', menuWindow);
});