const { connect, connection } = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoose-social-network', {
    useNewURLParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;