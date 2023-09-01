import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    threads: [ //one user can have multiple references to specific threads stored in the databse
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ],
    onboarded: { //once account is created then the user must go to onboarding to set up their account
        type: Boolean,
        default: false
    },
    communities: [ //user cna be a member of multiple communities
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]

});

const User = mongoose.models.User || mongoose.model('User', userSchema); //first account, the mongoose models is not going to exist so its going to fall back to creating a mongoose model user based on user schema but every second time we call it its already going to have a mongoose model in the database

export default User;