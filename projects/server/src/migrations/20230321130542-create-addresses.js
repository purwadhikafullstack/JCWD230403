'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      postalCode: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      lattitude: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      defaultAddress: {
        type: Sequelize.BOOLEAN
      },
      receiverName: {
        type: Sequelize.STRING
      },
      receiverPhone: {
        type: Sequelize.STRING
      },
      receiverEmail: {
        type: Sequelize.STRING
      },
      subDistrict: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('addresses');
  }
};