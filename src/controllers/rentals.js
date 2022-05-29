import db from  '../db.js';

export async function getRentals(req, res) {
    try {
		const { customerId, gameId } = req.query;

		const retalsList = await db.query(`
			SELECT  rentals.*,
					customers.id AS customer_id,
					customers.name AS customer_name,
					games.id AS game_id,
					games.name AS game_name,
					categories.id AS category_id,
					categories.name AS category_name FROM rentals 
			JOIN customers ON rentals."customerId" = customers.id 
			JOIN games ON rentals."gameId" = games.id 
			JOIN categories ON games."categoryId" = categories.id
			;`);

		let rentalsArray = retalsList.rows;

		if (customerId) {
			rentalsArray = rentalsArray.filter((obj) => obj.customerId === Number(customerId));
		}
		if (gameId) {
			rentalsArray = rentalsArray.filter((obj) => obj.gameId === Number(gameId));
		}

		const finalResponse = rentalsArray.map((obj) => ({
			id: obj.id,
			customerId: obj.customerId,
			gameId: obj.gameId,
			rentDate: obj.rentDate,
			daysRented: obj.daysRented,
			returnDate: obj.returnDate,
			originalPrice: obj.originalPrice,
			delayFee: obj.delayFee,
			customer: {
				id: obj.customer_id,
				name: obj.customer_name,
			},
			game: {
				id: obj.game_id,
				name: obj.game_name,
				categoryId: obj.category_id,
				categoryName: obj.category_name,
			},
		}));
		return res.send(finalResponse);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}

export async function postRental(req, res){
    const {customerId, gameId, daysRented} = req.body;
    const date = new Date();
    try{
        const price = await db.query(`
            SELECT * from games WHERE id = $1
        `, [gameId]);
        const originalPrice = price.rows[0].pricePerDay * daysRented;
        const rentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        
        await db.query(`
            INSERT INTO RENTALS ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [customerId, gameId, daysRented, rentDate, originalPrice, null, null]);
        res.send('OK')
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }

}

export async function putRental(req, res){
    const {id} = req.params;
    const data = req.body;
    const date = new Date(); 
    let time = new Date(data.rentDate); 
    try{
        const rightDay = time.setDate(time.getDate() + data.daysRented); 
        let delayFee = 0;
        if(date > rightDay){
            const totalDays = Math.ceil((date-rightDay) / (1000 * 3600 * 24)) 
            delayFee = totalDays * (data.originalPrice/data.daysRented);
        }
        const devolution = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        await db.query(`
            UPDATE rentals
            SET "customerId" = $1, "gameId" = $2, "daysRented" = $3, "rentDate" = $4, "originalPrice" = $5, "returnDate" = $6, "delayFee" = $7
            WHERE id = $8
        `, [data.customerId, data.gameId, data.daysRented, data.rentDate, data.originalPrice, devolution, delayFee, id]);
        res.send('OK')
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteRental(req, res){
    const {id} = req.params;
    try{
        await db.query(`
            DELETE FROM rentals
            WHERE id = $1
        `, [id]);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}