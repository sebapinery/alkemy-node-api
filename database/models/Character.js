const { Model, DataTypes} = require('sequelize');
const sequelize = require('../db');

class Character extends Model {}
Character.init({
    name: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    image: DataTypes.STRING,
    age: DataTypes.INTEGER,
    history: DataTypes.TEXT,

}, {
    sequelize,
    modelName: 'Character'
})

module.exports = Character;