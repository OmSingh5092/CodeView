var passport = require('passport');

const user = passport.authenticate('jwt', { session: false });

module.exports = {user}