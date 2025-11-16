import express from 'express';
import { Login, register } from '../controller/user.controller.js';
import {upload} from '../middleware/multer.js';
const router = express.Router();

// User registration route
router.post('/register',upload.single('image'), register )
router.post('/login', Login )

export default router;