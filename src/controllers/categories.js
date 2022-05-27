import db from '../db.js';

export async function getCategories(req, res) {
    try{
        const categories = await db.query(`
            SELECT *
            FROM categories
        `);
        res.send(categories.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postCategory(req, res) {
    const { name } = req.body;  
    try{
        const category = await db.query(`
            INSERT INTO categories (name)
            VALUES ($1)
        `, [name]);
        console.log(name)
        res.send(category.rows[0]);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}