import mongoose from 'mongoose';

const threadSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    }
    createdAt: {
        type: Date,
        default: Date.now,
    },
    parentId: {
        type: String,
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Thread'
        }
    ]

});

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema); //first account, the mongoose models is not going to exist so its going to fall back to creating a mongoose model user based on user schema but every second time we call it its already going to have a mongoose model in the database

export default Thread;