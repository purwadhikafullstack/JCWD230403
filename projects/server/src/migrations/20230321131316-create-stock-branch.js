'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stockBranches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stock: {
        type: Sequelize.INTEGER
      },
      booking: {
        type: Sequelize.INTEGER
      },
      entryDate: {
        type: Sequelize.DATEONLY
      },
      product_id: {
        type: Sequelize.INTEGER
      }, 
      branch_id: {
        type: Sequelize.INTEGER
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('stockBranches');
  }
};