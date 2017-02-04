"use strict";
/** Internal dependencies **/
const userService_1 = require("./../services/userService");
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
    static createUser(username, password) {
        return userService_1.default.createUser(username, password);
    }
    static readUser(id) {
        return userService_1.default.readUser(id);
    }
    static updateUser(userID, user) {
        return userService_1.default.updateUser(userID, user);
    }
    static deleteUser(id) {
        return userService_1.default.deleteUser(id);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChatController;
