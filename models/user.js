'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        roles: DataTypes.STRING,
        email: DataTypes.STRING,
        introduction: DataTypes.STRING,
        avatar: DataTypes.STRING,
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        tenantId: DataTypes.INTEGER,
        balance: DataTypes.STRING,
    }, {
        timestamps: false,
        tableName: 'user'
    });
    user.associate = function(models) {
        // associations can be defined here
    };
    return user;
};