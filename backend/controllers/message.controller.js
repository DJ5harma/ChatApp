import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const { message } = req.body;
        const senderId = req.user._id; // getting from middleware

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        // if (newMessage) {
        conversation.save();
        // }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller", error);
        return res.status(500).json({ error: error.message });
    }
};
export const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user._id; // getting from middleware

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        }).populate("messages"); //fills messages array with appropriate documents acc to ObjectIds

        if (!conversation) {
            res.status(200).json([]);
        }
        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("Error in getMessages controller", error);
        return res.status(500).json({ error: error.message });
    }
};
