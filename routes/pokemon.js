const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post('/', (req, res, next) => {
    return res.status(200).json(req.body);
})

pokemon.get('/', async(req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json({ code: 1, massage: pkmn });
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;

    if (id >= 1 && id <= 722) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id=?", id);
        return res.status(200).json({ code: 1, massage: pkmn })
    }

    return res.status(404).send({ code: 404, message: "Pokemón no encontrado" }); 
})

pokemon.get('/:name([A-Za-z]*)', async(req, res, next) => {
    const name = req.params.name.toLowerCase();
    
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name=?", name, (err, rows) => {
        if (rows.lenght >= 1) {
            return res.status(200).json({ code: 1, massage: pkmn })
        }
    });
    
    return res.status(404).send({ code: 404, message: "Pokemón no encontrado" }); 
})

module.exports = pokemon;