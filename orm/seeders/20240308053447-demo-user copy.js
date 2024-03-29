'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      "Category",
      [
        {
          name:"Áo - Nam",
          description:"Áo Nam",
        },
        {
          name:"Áo - Nữ",
          description:"Áo Nữ",
        },
        {
          name:"Quần - Nam",
          description:"Quần Nam",
        },
        {
          name:"Quần - Nữ",
          description:"Quần Nữ",
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
