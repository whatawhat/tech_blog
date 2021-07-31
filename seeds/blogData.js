const { Blog } =  require('../models');

const blogData = [
{
    title: 'Hello',
    content: 'Hello World',
    user_id: 1,
},
{
    title: 'Goodbye',
    content: 'Goodbye Sunshine',
    user_id: 2,
}

]

const blogInfo = () => User.bulkCreate(blogData);

module.exports = blogInfo;