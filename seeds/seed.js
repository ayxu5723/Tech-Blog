const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogs of blogData) {
    await Blog.create({
      ...blogs,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comments of commentData) {
    await Comment.create({
      ...comments,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  process.exit(0);
};

seedDatabase();

module.exports = seedDatabase;