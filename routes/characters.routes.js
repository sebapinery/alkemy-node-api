const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const { Op } = require('sequelize');

// Models
const Character = require('../database/models/Character');
const Movie = require('../database/models/Movies');

// FIND CHARACTERS 
router.get('/', async (req, res) => {
    let { details } = req.query;

    if(!details){
        const character = await Character.findAll({
            attributes: ['name', 'image']
        });
        res.json(character)
    }
    if(details === 'all'){
        const character = await Character.findAll({
            include: {
                model: Movie,
                as: 'Movies',
                attributes: ['title']
            }
        });
        res.json(character)
    } 

})

// SEARCH

router.get('/search/:search?', async (req, res) => {
    let { age, weight, movieId } = req.query;
    let { search } = req.params;
    

    if(search === undefined){
        res.status(400).json({ error: "Debe ingresar un termino de busqueda"})
    }else{
        search = search.toLowerCase();
        if(!age && !weight && !movieId){
            const characterFound = await Character.findAll({ 
                include: {
                    model: Movie,
                    as: 'Movies',
                    attributes: ['title', 'id']
                },
                where: {
                    name: { [Op.like]: '%' + search + '%'}
                },
            })
            if(characterFound.length === 0){
                res.status(204).json({msg: 'No results'})
            }else{
                res.json(characterFound)
            }
        }
    }

    if(movieId){
        const characterFound = await Character.findAll({ 
            include: {
                model: Movie,
                as: 'Movies',
                attributes: ['title', 'id'],
                where: {
                    id: {[Op.eq]: movieId}
                }
            },
            where: {
                name: { [Op.like]: '%' + search + '%'}
            }
        })
        if(characterFound.length === 0){
            res.status(204).json({msg: 'No results'})
        }else{
            res.json(characterFound)
        }
    }

    if(weight){
        const characterFound = await Character.findAll({ where: {
            [Op.and]: [
                { name: {[Op.like]: '%' + search + '%'}}, 
                { weight: {[Op.eq]: weight}}
            ]},
        })
        if(characterFound.length === 0){
            res.status(204).json({msg: 'No results'})
        }else{
            res.json(characterFound)
        }
    }

    if(age){
        const characterFound = await Character.findAll({ where: {
            [Op.and]: [{ name: {[Op.like]: '%' + search + '%'}}, {age: {[Op.eq]: age}}]
            },
        })
        if(characterFound.length === 0){
            res.status(204).json({msg: 'No results'})
        }else{
            res.json(characterFound)
        }
    }
})

// CREATE NEW CHARACTERS
router.post('/',[
    check('name', 'New character must have a name').not().isEmpty(),
    check('image', 'New character must have an image').not().isEmpty(),
    check('image', 'New character must have an image').isURL(),
    check('weight', 'New character must weight value').not().isEmpty(),
    check('weight', 'New character must a valid weight').isInt(),
    check('age', 'New character must a age value').not().isEmpty(),
    check('weight', 'New character must a valid age').isInt(),
    check('history', 'New character must have an history').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() })
    }

    const { MoviesId } = req.body;
    const createdCharacter = await Character.create(req.body)

    if(!MoviesId){
        res.status(201).json(createdCharacter)
    }
    if(MoviesId){

        var moviesArray = MoviesId;
        const newCharacter = await Character.findByPk(createdCharacter.id, {
            include: {
                model: Movie,
                as: 'Movies'
            }
        })

            for(i=0; i<moviesArray.length; i++){
                await newCharacter.addMovie(moviesArray[i])
                .catch( async (e) => {
                    await Character.destroy({ where: { id: createdCharacter.id} })
                    res.status(404).json({
                    error: 'Una o mas peliculas ingresadas no existe, el personaje no fue creado'
                })})
            }
        }
        const characterWithMovie = await Character.findByPk(createdCharacter.id, {
            include: {
                model: Movie,
                as: 'Movies'
            }})
        res.json(characterWithMovie)
    }
)

// FIND ONE SPECIFIC CHARACTER
router.get('/:id', async (req, res) =>{
    const characterFound = await Character.findByPk(req.params.id, {include: {
        model: Movie,
        as: 'Movies',
        attributes: ['title']
        }
    });
    if(characterFound === null){
        res.status(204).json({msg: 'No character found'})
    }else{
        res.json(characterFound)
    }
})

// UPDATE SPECIFIC CHARACTER
router.patch('/:id', async (req, res) =>{
    const characterFound = await Character.findByPk(req.params.id);

    if(characterFound === null){
        res.status(204).json({error: 'Character not found'})
    }else{
        await Character.update(req.body ,{
            where: {
                id: req.params.id,
            }
        })
        const editedCharacter = await Character.findByPk(req.params.id)    
        res.json(editedCharacter)
    }

})

// DELETE A CHARACTER 
router.delete('/:id', async (req, res) => {
    await Character.destroy({
        where: { id: req.params.id },
    })
    res.json({msg: `Character id: ${req.params.id} was deleted successfully`})
})

// Agregamos peliculas al los personajes

router.post('/addToMovie',[
    check('characterId', 'characterId can not be empty').not().isEmpty(),
    check('characterId', 'characterId must be a number').isInt(),
    check('movieId', 'movieId can not be empty').not().isEmpty(),
    check('movieId', 'movieId must be a number').isInt()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({errors: errors.array()})
    }

    const { characterId, movieId } = req.body;

    const characterFound = await Character.findByPk(characterId);
    const movieFound = await Movie.findByPk(movieId);

    if(characterFound === null){
        res.status(204).json({ error: 'Character not founded'}) 
    }
    if(movieFound === null){
        res.status(204).json({ error: 'Movie not founded'})
    }else{
    await characterFound.addMovie(movieFound)

    const characterEdited = await Character.findByPk(characterId, {
            include: {
                model: Movie,
                as: 'Movies',
                attributes: ['title']
            },
            timestamp: false
        })
    res.json(characterEdited)
    }
})


module.exports = router;