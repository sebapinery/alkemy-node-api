const express = require('express');
const app = express();
const sequelize = require('./database/db');
require('./database/asociations')


// SETTINGS
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const checkToken = require('./middlewares/checkToken')

// Routes
app.use('/api/movies',checkToken, require('./routes/movies.routes'));
app.use('/api/characters',checkToken, require('./routes/characters.routes'));
app.use('/api/users', require('./routes/users.routes'));

app.listen(PORT, async ()=>{
    console.log(`Servidor corriendo en puerto ${PORT}`)

    // Connect to database
    await sequelize.sync( {force: false } ).then(()=>{
        console.log('DB is connected')
    }).catch(error =>{
        console.log('Hubo un error en la conexion', error)
    })
})