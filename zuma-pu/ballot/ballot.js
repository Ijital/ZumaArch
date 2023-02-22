const { ipcRenderer } = require('electron');
const config = require('../app.config.json');
const { VotePack } = require('../app.models');
const Swal = require('sweetalert2');

let electionIndex = 0;
let votePack;



// Handles window load event
window.addEventListener("load", e => {
    loadBallotTempate();
    setNextElection();
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
    let electionTitle = config.elections[electionIndex++].title;
    votePack.setBallotVote(electionTitle, party);
    if (electionIndex > 4) {
        ipcRenderer.send('ballot-votes-completed', votePack);
        document.getElementById("ballot-fieldset").disabled = true;
        printVotePack();
        setTimeout(() => Swal.close(), 9350);
        return;
    }
    setNextElection();
}

// Loads the next election onto ballot template
function setNextElection() {
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

// Displays and prints vote pack
function printVotePack() {
    Swal.fire({
        showConfirmButton: false,
        allowOutsideClick: false,
        html: `<div class="container">
                <h4 id="print-ballot-header">FEDERAL REPUBLIC OF NIGERIA</h4>
                <h4>Election Ballot pack</h4>
                </br>
                 <div class="row">

                  <div class="col-sm-4 ballot-vote"><h6>Presidential </br> ${votePack["VoteForPresident"]}</h6></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/Parties/${votePack['VoteForPresident']}.jpg"></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/thumbprint.jpg"></div>


                  <div class="col-sm-4 ballot-vote"><h6>Senatorial </br> ${votePack["VoteForSenate"]}</h6></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/Parties/${votePack['VoteForSenate']}.jpg"></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/thumbprint.jpg"></div>


                  <div class="col-sm-4 ballot-vote"><h6>House of Reps </br> ${votePack["VoteForReps"]}</h6></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/Parties/${votePack['VoteForReps']}.jpg"></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/thumbprint.jpg"></div>


                  <div class="col-sm-4 ballot-vote"><h6>Gubernatorial ${votePack["VoteForGovernor"]}</h6></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/Parties/${votePack['VoteForGovernor']}.jpg"></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/thumbprint.jpg"></div>

                  
                  <div class="col-sm-4 ballot-vote"><h6>State Assembly</br> ${votePack["VoteForAssembly"]}</h6></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/Parties/${votePack['VoteForAssembly']}.jpg"></div>
                  <div class="col-sm-4 ballot-vote"><img width=50 src="../assets/img/thumbprint.jpg"></div>

                </div>
             </div>`,
        title: '',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

// Handles event voter has not been authorise
ipcRenderer.on('voter-info-submitted', (e, id, pu, age, gender, occupation) => {
    votePack = new VotePack(id, pu, age, gender, occupation);
})
