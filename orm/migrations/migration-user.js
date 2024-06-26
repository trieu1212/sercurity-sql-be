'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: { 
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone:{
        type: Sequelize.STRING,
        defaultValue:0
      },
      address:{
        type: Sequelize.STRING,
        defaultValue:null
      },
      email: {
        type: Sequelize.STRING
      },
      isAdmin: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      refreshToken: {
        type: Sequelize.STRING
      },
      passwordResetToken: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      passwordResetExpires: {
        type: Sequelize.STRING,
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};