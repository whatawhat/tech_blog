const { User } =  require('../models');

const userData = [
{
    name: 'Xavier',
    email: 'xavier@gmail.com',
    password: 'pw1234567'
},
{
    name: 'Silvia',
    email: 'silvia@gmail.com',
    password: 'pw1234567'
}

]

const userInfo = () => User.bulkCreate(userData);

module.exports = userInfo;