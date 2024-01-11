const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport, getUserByEmail, getUserByID) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, {message: "Žádný uživatel nemá tento e-mail"})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: "Špatné heslo!"})
            }

        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy(
        {usernameField: "eamil"},
        authenticateUser
    ))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserByID)
    })
}

module.exports = initialize