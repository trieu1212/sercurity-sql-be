const {Sequelize} = require('sequelize');


const sequelize = new Sequelize('bnfboiqzp7twcteh0dhx', "uspmzm0ptrbese3z" ,'KF4x4zCvcm8rMWAU4uGR', {
    host: 'bnfboiqzp7twcteh0dhx-mysql.services.clever-cloud.com',
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