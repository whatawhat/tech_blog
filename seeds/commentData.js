const { Comment } =  require('../models');

const commentData = [
{
    comment: 'Good job',
    blog_id: 1,
    user_id: 2,
},
{
    comment: 'Awesome',
    blog_id: 1,
    user_id: 1,
}

]

const commentInfo = () => Comment.bulkCreate(commentData);

module.exports = commentInfo;