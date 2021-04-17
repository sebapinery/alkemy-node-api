const sequelize = require('./database/db');
const Movie = require('./database/models/Movies');
const Character = require('./database/models/Character');
const User = require('./database/models/User');
const bcrypt = require('bcryptjs');
require('./database/asociations')

// User

const users = [
    { 
        username: "test", 
        password: "test"
    }
]

const movies = [
    {   id: 1, 
        title: "Timon y Pumba",
        image: "./images/movies/timon_y_pumba.jpg",
        releaseDate: "1995-02-03",
        rating: 4,
        genere: "Animales"
    },
    {   id: 2, 
        title: "Aladin",
        image: "./images/movies/aladin.jpg",
        releaseDate: "1999-02-03",
        rating: 4.6,
        genere: "Aventura"
    },
    {   id: 3, 
        title: "La bella y la bestia",
        image: "./images/movies/la_bella_y_la_bestia.jpg",
        releaseDate: "1991-02-03",
        rating: 4.9,
        genere: "Aventura"
    },
    {   id: 4, 
        title: "Las aventuras de Mickey y Pluto",
        image: "./images/movies/mickey_y_pluto.jpg",
        releaseDate: "1983-02-03",
        rating: 5,
        genere: "Aventura"
    },
    {   id: 5, 
        title: "Las aventuras de Mickey y Pluto 2",
        image: "./images/movies/mickey_y_pluto_2.jpg",
        releaseDate: "1990-02-03",
        rating: 5,
        genere: "Aventura"
    }
]

// Characters

const characters = [
    {   id: 1, 
        name: "Timon",  
        weight: 12, 
        image: "./images/characters/timon.jpg", 
        age: 4, 
        history: " Una suricata",
        Movies: [1]
    },
    {   id: 2, 
        name: "Pumba",  
        weight: 240, 
        image: "./images/characters/pumba.jpg", 
        age: 5, 
        history: " un chancho salvaje",
        Movies: [1]  
    },
    {   
        id: 3, 
        name: "Aladin",  
        weight: 54, 
        image: "./images/characters/aladin.jpg", 
        age: 15, 
        history: "Un chico aventurero",
        Movies: [2] 
    },
    {   id: 4, 
        name: "Princesa Jasmin",  
        weight: 50, 
        image: "./images/characters/princesa_jazmin.jpg", 
        age: 15, 
        history: "Un princesa de medio oriente",
        Movies: [2]  
    },
    {   id: 5, 
        name: "La bella",  
        weight: 55, 
        image: "./images/characters/la_bella.jpg", 
        age: 20, 
        history: "Bella es amable, inteligente y amante de los libros, por lo que en el pueblo la consideran una chica extraña y soñadora." ,
        Movies: [3]
    },
    {   id: 6, 
        name: "La Bestia",  
        weight: 240, 
        image: "./images/characters/la_bestia.jpg", 
        age: 40, 
        history: "Era un principe que por castigo temrino transformado en bestia",
        Movies: [3]
    },
    {   id: 7, 
        name: "Mickey Mouse",  
        weight: 45, 
        image: "./images/characters/mickey.jpg", 
        age: 12, 
        history: "El famoso ratoncito de Walt Disney",
        Movies: [4,5]
    },
    {   id: 8, 
        name: "Pluto",  
        weight: 40, 
        image: "./images/characters/pluto.jpg", 
        age: 6, 
        history: "La mascota de Mickey Mouse",
        Movies: [4,5]
    }
]

sequelize.sync({ force: true }).then(() => {
    // Conexión establecida
    console.log("DB is connected");
}).then(() => {
    // Crear usuario test
    users.forEach(user =>{
        user.password = bcrypt.hashSync(user.password, 10);
        User.create(user)
    })
}).then(() => {
    // Creac peliculas
    movies.forEach(movie => Movie.create(movie));
}).then(() => {
    // Crear personajes 
    characters.forEach(character => {
        Character.create(character).then(newCharacter => {
            // Relacionar personajes con peliculas
            var movies = character.Movies;
            for(i = 0; i < movies.length; i++) {
                newCharacter.addMovie(movies[i]);
            }
        })
    });
})