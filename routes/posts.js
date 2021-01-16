const express= require('express');
const router = express.Router();
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

//GET BACK ALL THE POST 
router.get('/',checkAuth, async (req,res)=> {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch {
        res.json({message : err})
    }
});

//Submit A POST 
router.post('/',(req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    
    post.save()
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message : err})
    })
});

//SPECIFIC POST 
router.get('/:postId',async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch (err) {
        res.json({message : err })
    }
})

//Delete SPECIFIC POST
router.delete('/:postId', async (req,res) => {
   try {
    const removedPost = await Post.remove({_id: req.params.postId})
    res.json(removedPost)
}catch (err){
       res.json({message : err})
   }    
});

//UPDATE A POST 
router.patch('/:postId', async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id :req.params.postId},
            {$set: {title: req.body.title}}
            );
        res.json(updatedPost);
    }catch (err) {
        res.json({message : null})
    }
})


module.exports = router;