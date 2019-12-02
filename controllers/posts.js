var Post = require('../models/post');

var PostsController = {
  Index: async function(req, res) {
    if(!req.cookies.userId) {
      res.redirect("/");
    }
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { 
        posts: posts,
        user: req.cookies.userId
       });
    });
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var today = new Date();
    var date = today.toDateString();
    var time = today.toTimeString().slice(0,8);
    var timeDate = time + ' ' + date;
    var post = new Post({ 
                    message: req.body.message, 
                    timeDate: timeDate
                  });
    console.log(req.body)
    post.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
