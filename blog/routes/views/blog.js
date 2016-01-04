var keystone = require('keystone');

/* Load Lists */
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res);
    /* Local template variables */
    var locals = res.locals;

    Post.model.find().limit(100).exec().then(function(posts) {
        locals.posts = posts;
    });

    view.render('blog');
}
