'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("SessionModels", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userAgent: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blocked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "UserModels",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("SessionModels");
  }
};
