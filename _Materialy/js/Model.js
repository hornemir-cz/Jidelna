class User {
    constructor(username, password) {
      this.username = username;
      this.password = password;
      this.loggedIn = false;
    }
  
    // Metoda pro uložení uživatele do IndexedDB
    saveToIndexedDB() {
      const request = indexedDB.open("UserDB", 1);
      request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore("users", { keyPath: "username" });
        objectStore.transaction.oncomplete = function() {
          const userObjectStore = db.transaction("users", "readwrite").objectStore("users");
          userObjectStore.add({ username: this.username, password: this.password });
        };
      };
    }
  
    // Metoda pro načtení uživatele z IndexedDB
    static loadFromIndexedDB(username, callback) {
      const request = indexedDB.open("UserDB", 1);
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction("users", "readonly");
        const objectStore = transaction.objectStore("users");
        const getRequest = objectStore.get(username);
  
        getRequest.onsuccess = function(event) {
          const userData = event.target.result;
          if (userData) {
            const user = new User(userData.username, userData.password);
            callback(user);
          } else {
            callback(null);
          }
        };
  
        getRequest.onerror = function(event) {
          console.error("Chyba při načítání uživatele:", event.target.errorCode);
          callback(null);
        };
      };
  
      request.onerror = function(event) {
        console.error("Chyba při otevírání databáze:", event.target.errorCode);
        callback(null);
      };
    }
  
    // Metoda pro registraci nového uživatele s uložením do IndexedDB
    static registerAndSaveToDB(username, password) {
      const newUser = new User(username, password);
      newUser.saveToIndexedDB();
      return newUser;
    }
  }
  