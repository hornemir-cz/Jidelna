class View {

    #studentKontejner = null;
    #predmetKontejner = null;

    constructor() {     
    }

    init() {
        console.log("INIT VIEW");
        this.#predmetKontejner = document.getElementById("student");
        this.#studentKontejner = document.getElementById("predmet");
    }

    vykresitStudenty(studenti) {
        console.log("V - pridavam", studenti);
    }

    vykreslitPredmety(predmety) {

    }

    bindPridatStudenta(handler) {
        document.getElementById("button").onclick = ev => {
            ev.preventDefault();
            const em = document.getElementById("RegEmail").value;
            const jm = document.getElementById("RegJmeno").value;
            const pr = document.getElementById("RegPrijmeni").value;
            const pw1 = document.getElementById("RegPasswd").value;
            const pw2 = document.getElementById("RegPasswd2").value;
            handler(em, jm, pr, pw1, pw2);
        }
    }
}