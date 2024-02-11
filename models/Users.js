const { Schema, model, Types } = require('mongoose');

//schema for users
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        thoughts:
            {
                type: Schema.Types.ObjectId,
                ref: "thought",
            },
        friends:
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//virutal to count number of friends a user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

//model for users using the userSchema
const User = model('User', userSchema)

module.exports = User;