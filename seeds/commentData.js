const { Comment } =  require('../models');

const commentData = [
{
    comment: 'Good job',
    comment_id: 1,
},
{
    comment: 'Awesome',
    comment_id: 1,
}

]

const commentInfo = () => Comment.bulkCreate(commentData);

module.exports = commentInfo;