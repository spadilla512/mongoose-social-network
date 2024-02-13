const { User } = require('../models');

//get all users
const userController = { getAllUsers(req, res) {
    User.find()
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
},

//get single user
getSingleUser(req, res) {
    User.findById(req.params.userId)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
},

//create user
createUser(req, res) {
    User.create(req.body)
        .then(userData => res.json(userData))
        .catch(err => res.status(500).json(err));
},

//update user
updateUser(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: "user not found" });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
},

//delete a user
deleteUser(req, res) {
    User.findOneAndDelete(req.params.id)
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'Not found' });
            }
            res.json({ message: 'User has been deleted' });
        })
        .catch(err => res.status(500).json(err));
},

//add new friend
addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId || req.params.friendId } },
        { new: true }
    )
        .then(userData => {
            if (!userData) {
                return res.status(404).json({ message: 'Not found' });
            }
            res.json(userData);
        })
        .catch(err => res.status(500).json(err));
},

//deleting a friend
deleteFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
    )
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: 'Not found' });
            }
            //verifying friend was deleted
            const removed = !dbUserData.friends.includes(params.friendId);

            if (removed) {
                res.json({ message: 'Friend has been removed', dbUserData });
            } else {
                res.json(dbUserData);
            }
        })
        .catch((err) => res.status(400).json(err));
},
};
module.exports = userController;