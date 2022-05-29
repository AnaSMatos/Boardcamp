import {Router} from 'express';
import { postRental, deleteRental, putRental, getRentals } from '../controllers/rentals.js';
import { valPostRental, valDeleteRental, valPutRental } from '../middlewares/validateRental.js';

const rentalsRouter = Router();

rentalsRouter.get('/rentals', getRentals);
rentalsRouter.post('/rentals', valPostRental, postRental);
rentalsRouter.put('/rentals/:id/return', valPutRental, putRental);
rentalsRouter.delete('/rentals/:id', valDeleteRental, deleteRental);

export default rentalsRouter;