const logButton = document.getElementById("logbtn")
const regButton = document.getElementById("regbtn")
const logForm = document.getElementById("logForm")
const regForm = document.getElementById("regForm")

function DisplayLog() {
    if (regButton.style.display !== "none") {
        logForm.style.display = "none"
        regForm.style.display = "flex"

    } else {
        logForm.style.display = "flex"
        regForm.style.display = "none"
    }
}

function DisplayReg() {
    if (logButton.style.display !== "none") {
        logForm.style.display = "flex"
        regForm.style.display = "none"
    } else {        
        logForm.style.display = "none"
        regForm.style.display = "flex"
    }
}