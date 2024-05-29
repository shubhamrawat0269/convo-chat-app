const mongoose = require("mongoose");
const conversationSchema = require("../schema/conversation.schema");

const conversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = conversationModel;
