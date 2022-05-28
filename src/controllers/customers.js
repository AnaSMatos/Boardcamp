import db from '../db.js';

export async function getCustomers(req, res) {
    const {cpf} = req.query;
    try{
        if (cpf) {
            const customers = await db.query(`
            SELECT * FROM customers 
            WHERE cpf ILIKE $1
        `, [`${cpf}%`]);
            res.send(customers.rows);
        }else{
            const customers = await db.query(`
                SELECT *
                FROM customers
            `);
            res.send(customers.rows);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getCustomer(req, res){
    const {id} = req.params;
    try{
        const customer = await db.query(`
            SELECT *
            FROM customers
            WHERE id = $1`, [id]);
        if(customer.rows.length === 0){
            return res.sendStatus(404);
        }
        res.send(customer.rows[0]);
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