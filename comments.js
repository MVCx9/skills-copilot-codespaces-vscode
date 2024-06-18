const express = require('express');
const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');
const { ensureAuthenticated } = require('../config/auth');

// Create web server
// Require node modules
const router = express.Router();

// Get all comments
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get one comment by id
router.get('/:commentId', ensureAuthenticated, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a comment
router.post('/:postId', ensureAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        const user = await User.findById(req.user.id);
        const newComment = new Comment({
            content: req.body.content,
            post: post._id,
            user: user._id
        });
        const savedComment = await newComment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;