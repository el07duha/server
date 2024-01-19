const { Sequelize } = require("sequelize");

const db = new Sequelize("defaultdb", "avnadmin", "AVNS_02Mv067oP0AwjGGh-vc", {
  host: "project-akhir-uas-project-akhir-uas.a.aivencloud.com",
  port: 10834,
  dialect: "mysql",
});

db.authenticate()
.then(() => {
  console.log("Successfully connect to database");
})
.catch((error) => {
  console.error("Unable to connect to the database:", error);
});

module.exports = db