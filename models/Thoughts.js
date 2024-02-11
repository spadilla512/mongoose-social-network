const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');

//schema for thoughts
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

//virtual to count number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//model for thoughts using thoughtSchema
const Thought = model('Thought', thoughtSchema)

module.exports = Thought