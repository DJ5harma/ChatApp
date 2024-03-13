import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: [true, "Fullname not provided!"],
            trim: true
        },
        username: {
            type: String,
            required: [true, "Username not provided!"],
            unique: [true, "Username already exists!"],
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password not provided!"],
            trim: true
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        profilePic: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
