import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(v);
            },
            message: props => 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        },
    },
    role: { // Renamed to role if needed
        type: String,
        enum: ['Admin', 'Recruiter', 'Participant'],
        required: [true, 'Role is required'],
    },
    profile: {
        bio: { type: String, default: '' },
        resume: { type: String, default: '' },
        participationHistory: { type: [String], default: [] },
    },
    createdAt: {
        type: Date,
        default: Date.now, // Fixed to avoid static date issue
    },
});

export default mongoose.model("User", userSchema);
