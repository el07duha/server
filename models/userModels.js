const { DataTypes } = require("sequelize");
const db = require("../config/dataBase.js");

const User = db.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull : false
    },
    phone_number: {
      type : DataTypes.STRING,
      allowNull : false
    }
  },
  {
    freezeTableName: true,
  }
);

module.exports =  User;

(async () => {
  await db.sync();
})();
