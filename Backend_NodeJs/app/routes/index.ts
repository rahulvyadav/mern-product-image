
import express from 'express';

import productRoutes from './productRoutes/productRoutes';

const router = express.Router();

router.use('/producttable', productRoutes);


export default router