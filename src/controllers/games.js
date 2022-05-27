import db from '../db.js';

export async function getGames(req, res) {
    try{
        const games = await db.query(`
            SELECT *
            FROM games
        `);
        res.send(games.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postGame(req, res) {
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;  
    try{
        await db.query(`
            INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
            VALUES ($1, $2, $3, $4, $5)
        `, [name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}