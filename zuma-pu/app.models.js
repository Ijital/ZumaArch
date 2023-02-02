const uuid = require('uuid');
const { BrowserWindow } = require('electron');

class AppWindow {
    constructor(template, parentWindow) {
        let window = new BrowserWindow({
            show: false,
            width: template == 'login' ? 250 : 2000,
            height: template == 'login' ? 320 : 2000,
            frame: false,
            parent: parentWindow,
            fullscreen: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        //window.webContents.openDevTools();
        window.loadFile(`./${template}/${template}.html`);
        window.once('ready-to-show', () => {
            if (template !== 'worker') {
                window.show();
            }
        })
        return window;
    }
}

class VoteBlock {
    constructor(Id, PU, age, gender, occupation) {
        this.VoterId = Id;
        this.VoterPU = PU;
        this.VoterAge = age,
        this.VoterGender = gender,
        this.VoterOccupation = occupation,
        this.VoteId = uuid.v1();
        this.VoteDate = this.#getVoteBlockDate();
        this.VoteLocation = 'Tine Nune';
        this.VoteForPresident = '';
        this.VoteForSenate = '';
        this.VoteForReps = '';
        this.VoteForGovernor = '';
        this.VoteForAssembly = '';
    }
    updateVoteBlock(election, votedParty) {
        this[election] = votedParty;
    }
    #getVoteBlockDate() {
        var date = new Date();
        return `${date.toLocaleDateString()}T${date.toLocaleTimeString()}`;
    }
}

module.exports = {
    VoteBlock: VoteBlock,
    AppWindow: AppWindow,
};