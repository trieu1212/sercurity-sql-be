const {Sequelize} = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();
const sequelize = new Sequelize(process.env.DATABASE||"bnfboiqzp7twcteh0dhx", "uspmzm0ptrbese3z" ,process.env.PASSWORD||"KF4x4zCvcm8rMWAU4uGR", {
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