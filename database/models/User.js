const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class User extends Model {}
User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Debe ingresar un username'
            },
            isAlpha: {
                args: true,
                msg: 'El username solo puede contener letras'
            },
            len: {
                args: [4, 15],
                msg: 'El username debe contener entre 4 y 15'
            }
        }
    },
    password: DataTypes.STRING,

}, {
    sequelize,
    modelName: 'user'
})

module.exports = User;