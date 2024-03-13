import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/tokenAndCookie.js";

export const signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } =
            req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match!" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists !" });
        } //Just for a better error message

        let picGender = gender === "male" ? "boy" : "girl";
        const profilePic = `https://avatar-placeholder.iran.liara.run/public/${picGender}?username=${username}`;

        const salt = await bcryptjs.genSalt(10); //random
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic,
        });
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            fullname: newUser.fullname,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.log("Error in signup controller", error);
        return res.status(500).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const findUser = await User.findOne({ username });

        if (!findUser) {
            return res.status(400).json({ error: "Username doesn't exist !" });
        }

        const isPasswordCorrect = await bcryptjs.compare(
            password,
            findUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Wrong password !" });
        }

        generateTokenAndSetCookie(findUser._id, res);

        res.status(200).json({
            _id: findUser._id,
            username: findUser.username,
            fullname: findUser.fullname,
            profilePic: findUser.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error);
        return res.status(500).json({ error: error.message });
    }
};
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out!" });
    } catch (error) {
        console.log("Error in login controller", error);
        return res.status(500).json({ error: error.message });
    }
};
