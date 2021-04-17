const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Movie extends Model {

}
Movie.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    rating: DataTypes.INTEGER,
    genere: DataTypes.STRING
},{
    sequelize,
    modelName: 'Movie',
})

module.exports = Movie;