const { userInfo } = require("os");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2],
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  blog_id: {
    type: DataTypes.INTEGER,
    reference: {
      model: "blog",
      key: "id",
    },
  },
});
