const {Sequelize} = require('sequelize');


const sequelize = new Sequelize(process.env.DATABASE, "root" ,null, {
    host: process.env.HOST,
    dialect:  'mysql' 
});

const connection = async()=>{
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
}
module.exports = connection;

