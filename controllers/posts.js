const Post = require('../models/Post');


exports.posts_get_all = async (req,res)=> {
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch {
        res.json({message : err})
    }
};

exports.post_create = (req,res) => {
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
};

exports.post_get_one = async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch (err) {
        res.json({message : err })
    }
};

exports.post_delete_one = async (req,res) => {
    try {
     const removedPost = await Post.remove({_id: req.params.postId})
     res.json(removedPost)
 }catch (err){
        res.json({message : err})
    }    
 };

 exports.post_patch =  async (req,res) => {
    try {
        const updatedPost = await Post.updateOne(
            {_id :req.params.postId},
            {$set: {title: req.body.title}}
            );
        res.json(updatedPost);
    }catch (err) {
        res.json({message : null})
    }
};