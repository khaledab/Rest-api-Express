const express= require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const postController = require ('../controllers/posts')

//GET BACK ALL THE POST 
router.get('/',checkAuth,postController.posts_get_all);

//Submit A POST 
router.post('/',checkAuth,postController.post_create);

//SPECIFIC POST 
router.get('/:postId',checkAuth,postController.post_get_one);

//Delete SPECIFIC POST
router.delete('/:postId',checkAuth,postController.post_delete_one);

//UPDATE A POST 
router.patch('/:postId',checkAuth,postController.post_patch);


module.exports = router;