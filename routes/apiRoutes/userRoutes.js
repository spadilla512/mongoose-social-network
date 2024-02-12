const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

//get and post all users
router.route('/').get(getAllUsers).post(createUser);

//get user, update user, and delete user by ID
router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

//post and delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;