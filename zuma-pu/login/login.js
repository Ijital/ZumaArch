const { ipcRenderer } = require('electron');
const swal = require('sweetalert2');

// Validates admin user login
function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username === "m" && password === "m") {
        ipcRenderer.send('admin-login');
        window.close();
    }
}