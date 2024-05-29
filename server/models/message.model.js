const mongoose = require("mongoose");
const messageSchema = require("../schema/messageSchema.schema");

const messagesModel = mongoose.model("Messages", messageSchema);

module.exports = messagesModel;
