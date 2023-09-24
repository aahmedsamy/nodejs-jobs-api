const mongose = require('mongoose')
const {required} = require("joi");

const JobSchema = new mongose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['Interview', 'declined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Pleasae provide user']
    }
}, {timestamps: true})

module.exports = mongose.model('Job', JobSchema)