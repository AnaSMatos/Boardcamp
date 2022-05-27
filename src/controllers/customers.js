import db from '../db.js';

export async function getCustomers(req, res) {
    const {id} = req.params;
    if(id){
        console.log(id);
    }else{
        console.log('no id');
    }
    try{
        const customers = await db.query(`
            SELECT *
            FROM customers
        `);
        res.send(customers.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function postCustomer(req, res) {
    const { name, phone, cpf, birthday } = req.body;  
    try{
        await db.query(`
            INSERT INTO customers (name, phone, cpf, birthday)
            VALUES ($1, $2, $3, $4)
        `, [name, phone, cpf, birthday]);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;  
    try{
        await db.query(`
            UPDATE customers
            SET name = $1, phone = $2, cpf = $3, birthday = $4
            WHERE id = $5
        `, [name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}