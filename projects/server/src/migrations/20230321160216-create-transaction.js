'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.STRING
      },
      isVoucher: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.ENUM, 
        values: [
          'Waiting for payment',
          'Transaction is on going',
          'Transaction is completed',
          'Cancelled',
      ],
      defaultValue: 'Waiting for payment'
      },
      totalCheckOut: {
        type: Sequelize.INTEGER
      },
      totalOrderQty: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('transactions');
  }
};