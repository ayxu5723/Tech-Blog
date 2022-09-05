const router = require('express').Router();
const { Blog, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get ({ plain: true}));
    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in
    });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment, include: {
            model:User,
            attributes: ['id', 'name']
          }
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json('err');
  }
});

// router.get('/comment/:id', async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//         {
//           model: Blog,
//           attributes: ['title'],
//         },
//       ],
//     });

//     const comment = commentData.get({ plain: true });

//     res.render('comment', {
//       ...comment,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json('err');
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password']},
    });

    const user = userData.get({ plain: true});

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect them to dashboard
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
});


// router.get('/blog', async (req, res) => {
//   try {
//     res.render('blog', {
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


module.exports = router;