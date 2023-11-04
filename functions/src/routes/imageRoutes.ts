import {
  getAllImages,
  getImage,
  createImage,
  updateImage,
  deleteImage,
  shortenImageLink,
} from '../controllers/imageController';
import * as express from 'express';

const router = express.Router();

router.get('/images', getAllImages);
router.get('/images/:id', getImage);
router.post('/images', createImage);
router.put('/images/:id', updateImage);
router.delete('/images/:id', deleteImage);
router.post('/shorten', shortenImageLink);

export default router;
