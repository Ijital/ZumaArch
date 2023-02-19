const { ipcRenderer } = require('electron');
const config = require('../app.config.json');
const Swal = require('sweetalert2');

let electionIndex = 0;

// Handles window load event
window.addEventListener("load", e => {
    loadBallotTempate();
    loadNextElection();
});

// Handles event when voter has selected a party to vote for in election on the current ballot
function handleBallotVote(party) {
    Swal.fire({
        title: `You have selected ${party}`,
        showCancelButton: true,
        confirmButtonText: '<img src="../assets/img/approved.jpg"/>',
        cancelButtonText: '<img src="../assets/img/cancel.jpg"/>',
        text: 'Please Confirm or Cancel Selection',
        imageUrl: `../assets/img/Parties/${party}.jpg`,
        imageWidth: 180,
        imageHeight: 180,
    }).then(ballotVote => { if (ballotVote.isConfirmed) { submitBallotVote(party); } });
}

//Handles event when user has comfirmed thier vote in current ballot
function submitBallotVote(party) {
    let ballotElection = config.elections[electionIndex++].title;
    ipcRenderer.send('ballot-vote-submitted', ballotElection, party);
    if (electionIndex > 4) {
        ipcRenderer.send('ballot-votes-completed');
        const buttons = document.querySelector("button");
        buttons.forEach((b)=>{
            b.setAttribute("disabled", "");
        });
    }
    else {
        loadNextElection();
    }
}

// Loads a ballot for an election offered on the day
function loadNextElection() {
    let electionName = config.elections[electionIndex].name;
    document.getElementById("election-title").innerText = `${electionName}`;
}

// Loads the eballot template for every election
function loadBallotTempate() {
    let ballotTemplate = document.getElementById('ballot-template');
    config.parties.forEach((party) => {
        let partyOption = document.createElement('div');
        partyOption.classList.add('col-sm-2');
        partyOption.innerHTML =
        `<button class="btn" onclick="handleBallotVote('${party.acronym}')">
            <img width=100 height=100 src="../assets/img/Parties/${party.acronym}.jpg" data-acronym="${party.acronym}">
        </button>`;
        ballotTemplate.appendChild(partyOption);
    });
}