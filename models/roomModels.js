const { DataTypes } = require("sequelize");
const db = require("../config/dataBase.js");

const Room = db.define(
  "Room",
  {
    roomId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
  }
);

module.exports =  Room;

(async () => {
  await db.sync();

  // await db.sync({ force: true }) // Use { force: true } to drop and recreate tables
  //   .then(async () => {
  //     for (let i = 1; i <= 300; i++) {
  //       await Room.create({
  //         roomId: i,
  //         price: Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000,
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error('Error syncing model:', error);
  //   });
})();
