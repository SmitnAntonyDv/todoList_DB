"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "tags",
      [
        {
          title: "Urgent",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "coding",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "house tasks",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "family",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tags", null, {});
  },
};
