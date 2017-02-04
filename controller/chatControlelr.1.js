"use strict";
const chatService_1 = require("./../services/chatService");
class ChatController {
    constructor() {
    }
    static add(userId, chatText) {
        return chatService_1.default.addChat(userId, chatText);
        /*
        return new Promise( (resolve, reject) => {
            ChatService.addChat(userId, 'bot', chatText);
            ChatService.addChat('bot', userId, this.excuteNlp(chatText));
            resolve();
        });*/
    }
    static readChat(userId) {
        return chatService_1.default.readUser(userId);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatController;
