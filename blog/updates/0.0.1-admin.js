var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(done) {

    new User.model({
        name: { first: 'Admin', last: 'User' },
        email: 'test@nerdsville.net',
        password: 'admin',
        canAccessKeystone: true
    }).save(done);

};
