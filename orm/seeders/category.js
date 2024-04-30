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
          description:"Áo nam chất lượng cao",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Áo - Nữ",
          description:"Áo nữ chất lượng cao",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Quần - Nam",
          description:"Quần nam chất lượng cao",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name:"Quần - Nữ",
          description:"Quần nữ chất lượng cao",
          createdAt: new Date(),
          updatedAt: new Date(),
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
