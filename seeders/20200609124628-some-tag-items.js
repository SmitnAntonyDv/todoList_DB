"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "itemTags",
      [
        {
          tagId: 1,
          todoItemId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tagId: 2,
          todoItemId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tagId: 2,
          todoItemId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          tagId: 1,
          todoItemId: 2,
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
