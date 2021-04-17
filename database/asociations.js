const Character = require('./models/Character')
const Movies = require('./models/Movies')



// CHARACTER HAS MANY MOVIES
Character.belongsToMany(Movies, { through: "character_movie", timestamps: false});
Movies.belongsToMany(Character, { through: "character_movie", timestamps: false});

