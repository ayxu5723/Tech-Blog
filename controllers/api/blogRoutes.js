const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');

// router.get('/:id', withAuth, async (req,res) => {
//   try {
//       const blogData = await Blog.findByPk(req.params.id);

//       if (!blogData) {
//           res.status(500).json({message: 'No blog entry found with that id!'});
//           return;
//       }
//       res.status(200).json(blogData);
//   } catch(err) {
//       res.status(500).json(err);
//   }
// });

// Get all blog data 
router.get('/', withAuth, async (req, res) => {
  try{
    const blogData = await Blog.findAll({
      include: [ Comments, User ]
    });
      res.status(200).json(blogData);
  } catch(err) {
      res.status(500).json(err);
  }
});

// // Get all blog data associated with user
// router.get('/user', async (req, res) => {
//   try{
//     const UserBlogData = await Blog.findAll({
//       include: [{ model: User}],
//         where:{
//           user_id: req.session.user_id
//         }
//     });
//     res.status(200).json(UserBlogData);
//   } catch(err) {
//     res.status(500).json(err);
//   }
// });

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      date_created:req.body.date_created,
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.update({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json('Blog post updated');
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json('Blog post deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
