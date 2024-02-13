const { Thought, User, Reaction } = require('../models');
const { Types } = require('mongoose');

//get all thoughts
const thoughtController = { async getAllThoughts (req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
},

//get single thought by id
async getThoughts(req, res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (!thought) {
            res.status(400).json({ message: 'Not found' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
},

//create a thought
async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        res.status(201).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},

//delete a thought
async deleteThought(req, res) {
    try {
        const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},

//update thought
async updateThought(req, res) {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
            new: true,
        });
        if (!thought) {
            res.status(404).json({ message: 'Not found' });
        } else {
            res.json(thought);
        }
    } catch (err) {
        res.status(500).json(err);
    }
},
//add reaction to a thought
async createReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        thought ? res.json(thought) : res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json(err);
    }
},

//delete reaction to a thought
async deleteReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );
        thought ? res.json(thought) : res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json(err);
    }
},
};

module.exports = thoughtController;