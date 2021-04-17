const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const { check, validationResult } = require('express-validator');

// Model
const Movie = require('../database/models/Movies');
const Character = require('../database/models/Character');

// FIND ALL MOVIES
router.get('/', async (req, res) => {
    let { details } = req.query;

    if(!details) {
        const movie = await Movie.findAll({
            attributes: ['title', 'image', 'releaseDate']
        });
        res.json(movie)
    }
    if(details === 'all'){
        const movie = await Movie.findAll({ 
        include: {
            model: Character,
            as: 'Characters',
            attributes: ['name']
            }
        });
        res.json(movie)
    }
})

// SEACH IN MOVIES

router.get('/search/:search?', async (req, res) => {
    let { sort, genere } = req.query;
    let { search } = req.params;

    if(search === undefined){
        res.status(400).json({ error: 'Debe ingresar un termino de busqueda'})
    }else{
        search = search.toLowerCase();
        if(!sort && !genere){
            const moviesFound = await Movie.findAll({
                include: {
                    model: Character,
                    as: 'Characters',
                    attributes: ['name']
                },
                where: { 
                    title: {[Op.like]: '%' + search + '%'}
                }
            })
            if(moviesFound.length === 0){
                res.json({search: search})
            }else{
                res.json(moviesFound)
            }
        }

        if(genere){
            const moviesFound = await Movie.findAll({ 
                include: {
                    model: Character,
                    as: 'Characters',
                    attributes: ['name']
                },
                where: {
                    [Op.and]: {
                        title: { [Op.like]: '%' + search + '%'},
                        genere: { [Op.like]: '%' + genere + '%'}
                    }
                },
                order: [['releaseDate', typeof sort === "undefined" ? "ASC" : sort ]]
            })
            if(moviesFound.length === 0){
                res.status(204).json({msg: 'No results'})
            }else{
                res.json(moviesFound)
            }
        }

 
        if(sort && genere === undefined){
            const moviesFound = await Movie.findAll({ 
                include: {
                    model: Character,
                    as: 'Characters',
                    attributes: ['name'],
                },
                where: {
                    [Op.and]: [{
                        title: { [Op.like]: '%' + search + '%'}
                    }, 
                ]
                },
                order: [['releaseDate', typeof sort === "undefined" ? "ASC" : sort ]]
            })
            if(moviesFound.length === 0){
                res.status(204).json({msg: 'No results'})
            }else{
                res.json(moviesFound)
            }
        } 

        }

})

// CREATE NEW MOVIE
router.post('/',[
    check('title', 'New movie must have a title').not().isEmpty(),
    check('image', 'New movie must have an image').not().isEmpty(),
    check('releaseDate', 'New movie must have a release date').not().isEmpty(),
    check('releaseDate', 'releaseDate is not a valid date').isDate(),
    check('rating', 'Rating must be greater than one and a maximum of five').isFloat({ min:1, max:5})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() })
    }else{
        const newMovie = await Movie.create(req.body)
    res.status(201).json(newMovie);
    }
})

// FIND ONE SPECIFIC MOVIE
router.get('/:id', async (req, res) =>{
    const movieFound = await Movie.findByPk(req.params.id, {
        include: {
            model: Character,
            as: "Characters",
            attributes: ['name']
        }
    });

    if(movieFound === null){
        res.status(204).json({msg: 'No movie found'})
    }else{
        res.json(movieFound)
    }
})

// UPDATE SPECIFIC MOVIE
router.patch('/:id', async (req, res) =>{
    const movieFound = await Movie.findByPk(req.params.id);

    if(movieFound === null){
        res.status(404).json({error: 'Movie not found'})
    }else{
        await Movie.update(req.body,{
            where: {
                id: req.params.id,
            }
        })
        const editedMovie = await Movie.findByPk(req.params.id);
        res.json(editedMovie);
    }
})

// DELETE A MOVIE AND
router.delete('/:id', async (req, res) => {
    await Movie.destroy({
        where: { id: req.params.id },
    })
    res.json({msg: `Movie id: '${req.params.id}' has been deleted`});
})

module.exports = router;