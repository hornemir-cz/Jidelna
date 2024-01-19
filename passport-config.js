const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    console.log('Trying to authenticate user:', email);
    
    const user = getUserByEmail(email);
    
    if (user == null) {
      console.log('No user found with email:', email);
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log('Authentication successful for user:', email);
        return done(null, user);
      } else {
        console.log('Incorrect password for user:', email);
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      console.error('Error during authentication:', e);
      return done(e);
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });

  passport.addMiddleware = (req, res, next) => {
    res.locals.auth = req.isAuthenticated();
    next();
  }
}

module.exports = initialize;
