class Controller {
    #view
    #model

    constructor(m, v) {
        this.#model = m;
        this.#view = v;

        this.#model.bindPripojDb(this.handlePripojeniDB);        
        this.#model.bindZmenaDatStudenti(this.handleZmenaDatStudenti);      
        
        window.addEventListener("load", () => {
            this.#view.init();
            this.#model.pripojDB();

            this.#view.bindPridatStudenta(this.handlePridatStudenta)
        })
                
    }

    handlePripojeniDB = () => {
        const st = this.#model.vratStudenty();
        st.then(this.#view.vratStudenty);
        console.log("INIT Controller - C");
    }

    handlePridatStudenta = (em, jm, pr, pw1, pw2) => {
        console.log("C - přidavam studenta", em, jm, pr, pw1, pw2);
        this.#model.ulozData(em, jm, pr, pw1, pw2);
    }

    handleZmenaDatStudenti = async () => {
        this.#view.vratStudenty(await this.#model.vratStudenty());
    }


}