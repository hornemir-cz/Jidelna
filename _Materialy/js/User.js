class User {    
    constructor(email, jmeno, prijmeni, heslo) {
      this.email = email
      this.jmeno = jmeno
      this.prijmeni = prijmeni
      this.heslo = heslo
    }
  
    static isValidPassword(pw1, pw2) {
      return pw1 === pw2 && pw1.length >= 8
    }
  
    static isValidField(x) {
      return x && x.length > 0
    }
  }