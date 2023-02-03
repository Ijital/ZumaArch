const { ipcRenderer } = require('electron');
const electionsConfig = require('../election.config.json');
const Swal = require('sweetalert2');

let electionIndex = 0;
let ballot;

// Handles window load event
window.addEventListener("load", e => {
    loadNextBallot();
    ballot = document.getElementById('ballot');
});

// Handles event when voter has selected a party to vote for in election on the current ballot
function handleVoteChoice(party) {
    Swal.fire({
        title: `You have selected ${party.dataset.acronym}`,
        showCancelButton: true,
        confirmButtonText: '<img src="../assets/img/Tick2.jpg"/>',
        cancelButtonText: '<img src="../assets/img/cancel.jpg"/>',
        text: 'Please confirm or Cancel vote',
        imageUrl: `../assets/img/Parties/${party.dataset.acronym}.jpg`,
        imageWidth: 180,
        imageHeight: 180,
    }).then(vote => { if (vote.isConfirmed) { submitBallot(party); } });
}

//Handles event when user has comfirmed thier vote in current ballot
function submitBallot(party) {
    let currentElection = electionsConfig.elections[electionIndex++].title;
    let partyVotedFor = party.dataset.acronym;

    ipcRenderer.send('ballot-submitted', currentElection, partyVotedFor);

    if (electionIndex > 4) {
        ipcRenderer.send('vote-completed');
        window.close();
    }
    loadNextBallot();
}

// Loads a ballot for an election offered on the day
function loadNextBallot() {
    let electionName = electionsConfig.elections[electionIndex].name;
    document.getElementById("election-title").innerText = `${electionName}`;
    
    if (electionIndex == 1) {
        ballot.classList.add('ballot-change-transition');
    }
    else if (electionIndex > 1) {
       // ballot.style.animation = "none";
        ballot.classList.add('ballot-change-transition');
       // ballot.style.animation = "mymove";
    }
}