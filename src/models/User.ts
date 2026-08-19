import mongoose from "mongoose";

export enum UserRole {
    LISTER = "Lister",
    SEEKER = "Seeker",
};

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(UserRole),
    }
});

export const User = mongoose.model("User", userSchema);