"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "something",
          todoListId: 1,
          important: false,
          deadline: "end of this week",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "random task2",
          todoListId: 1,
          important: true,
          deadline: "end of this month",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "random task3",
          todoListId: 1,
          important: false,
          deadline: "yesterday",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "random task4",
          todoListId: 2,
          important: true,
          deadline: "in two days!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("todoItems", null, {});
  },
};
