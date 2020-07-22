'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
          */
        return queryInterface.bulkInsert('user', [{
            roles: 'admin',
            introduction: 'I am a super administrator',
            avatar: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
            name: 'Super Admin',
            password: "123456",
            email: 'MTdsd3@163.com',
            tenantId: 23,
            balance: "0",
            createdAt: Date.parse(new Date()), //時間戳
            updatedAt: Date.parse(new Date()), //時間戳
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
        return queryInterface.bulkDelete('user', null, {});
    }
};