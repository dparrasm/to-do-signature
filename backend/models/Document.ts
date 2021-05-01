import mongoose, { Schema } from 'mongoose';

const DocumentSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.String,
        ref: 'user',
        required: true
    },
    receivers: {
        type: Schema.Types.Array,
        ref: 'user'
    },
    creationDate: {
        type: Schema.Types.Date,
        required: true
    },
    signed: {
        type: Schema.Types.Boolean,
        required: true
    },
    filePath: {
        type: Schema.Types.String,
        required: true
    },
    title: {
        type: Schema.Types.String,
        required: true
    },
    url: {
        type: Schema.Types.String
    }
});

module.exports = mongoose.model('Document', DocumentSchema);