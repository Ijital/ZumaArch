const { BrowserWindow } = require('electron');

// Encaspulates an application UI window
class AppWindow {
    constructor(template, parentWindow) {
        let window = new BrowserWindow({
            show: false,
            width: template == 'login' ? 250 : 2000,
            height: template == 'login' ? 320 : 6000,
            frame: false,
            parent: parentWindow,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        //window.webContents.openDevTools();
        window.loadFile(`./${template}/${template}.html`);
        window.once('ready-to-show', e => {
            if (template !== 'worker') { window.show(); }
        })
        return window;
    }
}

// Encaspulates all possible elections a voter can vote in
class VotePack {
    constructor(vin, PU, age, gender, occupation, location) {
        this.Vin = vin;
        this.VoterPU = PU;
        this.VoterAge = age;
        this.VoterGender = gender,
        this.VoterOccupation = occupation;
        this.VoteDate = this.#getVotePackDate();
        this.VoteLocation = location;
        this.VoteForPresident = '';
        this.VoteForSenate = '';
        this.VoteForReps = '';
        this.VoteForGovernor = '';
        this.VoteForAssembly = '';
    }
    setBallotVote(election, votedParty) {
        this[election] = votedParty;
    }

    #getVotePackDate() {
        var date = new Date();
        return `${date.toLocaleDateString()}T${date.toLocaleTimeString()}`;
    }
}

// Module exports
module.exports = {
    VotePack: VotePack,
    AppWindow: AppWindow,
};