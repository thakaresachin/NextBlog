import express from 'express';
import { allBlogs, createBlog, deleteBlog, updateBlog, userBlogs } from '../controller/blog.controller.js';
import {upload} from '../middleware/multer.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
const router = express.Router();


router.post('/createblog',isAuthenticated ,upload.single('image'),createBlog)
// ✅ Correct
router.delete('/deleteblog/:id', isAuthenticated, deleteBlog);

router.get('/all',allBlogs)
router.get('/user/blog',isAuthenticated,userBlogs)

router.put("/updateblog/:id", isAuthenticated, upload.single("image"), updateBlog);

export default router;
