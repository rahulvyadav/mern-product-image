import { Router } from 'express';
import productController from '../../controller/index';
import { upload } from '../../middleware/fileUpload'


const router = Router();

router.post('/postproductdetail', upload.single('image'), productController.productController.ProductDetails);

router.get('/getproductdetail', productController.productController.getproductdetails);

router.delete('/deleteproduct/:id', productController.productController.deleteproductdetails);

router.get('/sortsearchpost', productController.productController.sortingSearchPostDetails);

export default router;