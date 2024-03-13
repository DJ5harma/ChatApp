import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 20, //20days,
        httpOnly: true, //Scripting attack prevention
        sameSite: "strict", //Forgery attack prevention
        secure: process.env.IN_DEVELOPMENT==="yes"? false: true
    });
};
export default generateTokenAndSetCookie;
