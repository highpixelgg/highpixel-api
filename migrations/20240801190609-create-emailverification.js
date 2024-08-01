"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("EmailVerificationModels", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      secretCode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      used: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
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
          model: "UserModels", // Nome da tabela referenciada
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("EmailVerificationModels");
  },
};
