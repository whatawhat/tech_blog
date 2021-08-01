const { Model, DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

//Defines table columns and specific requirements
Blog.init(
    {
        id: { //an attribute
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement: true,
          },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [2]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        date: {
            type:DataTypes.DATE,
            defaultValue: DATE.NOW,
            },
    },
    {
        sequelize,
        //timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;
