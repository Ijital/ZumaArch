const {ipcRenderer} = require('electron');

// Handles event when admin user has selected the voter portal 
function launchVoterWindow() {
    ipcRenderer.send('voter-portal-selected');
}

// Handles event when admin user has selected the report panel
function launchReportWindow(){
    ipcRenderer.send('report-portal-selected'); 
}

// Handles event when admin user had logged in
ipcRenderer.on('admin-login', e => {
    var menuButtons = document.getElementsByClassName("menu-btn");
    for (button of menuButtons) {
        button.removeAttribute("disabled");
    };
});