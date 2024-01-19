// initialize.js

require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./models/user')

// Připojení k databázi
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Mongoose DB připojena!'))

// Vytvoření výchozího administrátora, pokud neexistuje
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' })

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10)

      const adminUser = new User({
        fname: 'Default',
        lname: 'Admin',
        email: process.env.DEFAULT_ADMIN_EMAIL,
        hash: hashedPassword,
        credit: 0,
        role: 'admin' // předpokládáme, že máte pole "role" ve vašem modelu User
      })

      await adminUser.save()
      console.log('Vytvořen výchozí administrátor.')
    } else {
      console.log('Výchozí administrátor již existuje.')
    }
  } catch (error) {
    console.error('Chyba při vytváření výchozího administrátora:', error)
  } finally {
    mongoose.disconnect() // Odpojení od databáze po provedení operace
  }
}

// Spustit vytváření výchozího administrátora
createDefaultAdmin()
