const router = require('express').Router();

const {
    getAllThoughts,
    getThoughts,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

//get and post route all thoughts
router.route('/').get(getAllThoughts).post(createThought);

//get, put, delete a thought through an Id
router.route('/:thoughtId')
    .get(getThoughts)
    .put(updateThought)
    .delete(deleteThought);

// post a reaction
router.route('/:thoughtId/reactions').post(createReaction);

//delete reaction
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;