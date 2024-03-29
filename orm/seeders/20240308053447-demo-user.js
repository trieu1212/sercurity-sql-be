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
      "Product",
      [
        {
          title: "Quần Dài Nam Jeans Col",
          description:"Quần Dài Nam Jeans Col Cơ Bản Trẻ Trung",
          image:"https://product.hstatic.net/1000304105/product/quan-dai-nam-xcd3__5__253850635a6f4cc89a16b4e3ad55aa84_master.jpg",
          categoryId:3,
          price: 615000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Áo Nỉ Nữ Suông",
          description:"Áo Nỉ Nữ Suông Trẻ Trung",
          image:"https://product.hstatic.net/1000304105/product/ao-ni-nu-suong-rtu1__8__c99cdcea253347a3bbc35f2a48a98607_master.jpg",
          categoryId:2,
          price: 300000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Áo Thun Dài Tay Nam",
          description:"Áo Thun Dài Tay Nam Ôm Vừa",
          image:"https://product.hstatic.net/1000304105/product/whi1__4__dc80dc4d46fe472d8497f746e251f77a_master.jpeg",
          categoryId:1,
          price: 185000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Quần Tây Dài Nam",
          description:"Quần Tây Dài Nam Jeans",
          image:"https://product.hstatic.net/1000304105/product/quan-dai-nam-jeans-quan-tay-xde3__9__7f939abbc4a14cd49acafcc9d400e3ea_master.jpg",
          categoryId:3,
          price: 680000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Quần Dài Nữ",
          description:"Quần Dài Nữ Jeans Suông Trẻ Trung",
          image:"https://product.hstatic.net/1000304105/product/quan-dai-nu-xch2__3__78674dadd67d42e0b891200c58162f9b_master.jpg",
          categoryId:4,
          price: 513000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Quần Tây Dài Nữ",
          description:"Quần Tây Dài Nữ Nhung Trẻ Trung",
          image:"https://product.hstatic.net/1000304105/product/quan-tay-nhung-xre1__3__6b0d96e6a1624b57924c016658c64185_master.jpg",
          categoryId:4,
          price: 342000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Áo Khoác 1 Lớp Nữ",
          description:"Áo Khoác 1 Lớp Nữ Jeans Suông",
          image:"https://product.hstatic.net/1000304105/product/ao-khoac-1-lop-hinh-ve-phuong-xanh__1__e3d8cbc271134324a493174f6b13b61c_master.jpg",
          categoryId:2,
          price: 2022000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Áo Khoác 1 Lớp Nam",
          description:"Áo Khoác 1 Lớp Nam Jeans Suông Vừa",
          image:"https://product.hstatic.net/1000304105/product/ao-khoac-nam-kim-hoang__1__f3d07a64d8da487a87e3bc2e4a67bf94_master.jpg",
          categoryId:1,
          price: 1800000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Quần Sooc Nữ",
          description:"Quần Sooc Nữ Jeans Dáng A",
          image:"https://product.hstatic.net/1000304105/product/jrc_7675_6ce8d5b15d9d45ffa244bc1caf740fff_master.jpg",
          categoryId:4,
          price: 100000,
          inStock: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Quần Ngố Nam",
          description:"Quần Ngố Nam Kaki Suông",
          image:"https://product.hstatic.net/1000304105/product/26.1-studio5162_101e6ec47cd84bd2b67e5eedd3856135_master.jpg",
          categoryId:3,
          price: 143000,
          inStock: true,
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
