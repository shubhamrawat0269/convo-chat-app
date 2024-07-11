const mongoose = require("mongoose");
const messageSchema = require("../schema/message.schema");

const messagesModel = mongoose.model("Messages", messageSchema);

module.exports = messagesModel;
