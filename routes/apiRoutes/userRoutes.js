const router = require('express').Router();

const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUserById,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

//get and post all users
router.route('/').get(getAllUsers).post(createUser);

//get user, update user, and delete user by ID
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUserById);

//post and delete friends
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;