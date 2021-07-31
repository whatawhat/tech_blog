const userSeed = require('./userData');
const blogSeed = require('./blogData.js');
const commentSeed = require('./commentData.js');
const sequelize = require('../config/connection');

//newly added
//import user model
const { User, Comment, Blog } = require('../models');

const seedData = async() => {
    await sequelize.sync({ force: true });
    console.log("Connecting to Database");
    await userSeed();
    console.log("Seed users ran");
    //await blogSeed();
    console.log("Blogs posted");
    //await commentSeed();
    console.log("Comments are added");
    process.exit(0);
};

seedData();

