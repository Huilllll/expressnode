'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
        title: "灯下尘",
        content: "黄昏收集者",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "今天天气如何",
        content: "晴空万里",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};