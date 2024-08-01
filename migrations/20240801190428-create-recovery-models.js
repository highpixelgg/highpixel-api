"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("RecoveryModels", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
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
      secretCode: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [150, 150],
        },
      },
      used: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("RecoveryModels");
  },
};
