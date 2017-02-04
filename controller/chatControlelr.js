"use strict";
/** Internal dependencies **/
const chatService_1 = require("./../services/chatService");
let unknownChatList = [
    '방금 하신 말씀을 잘 못 알아들었어요.',
    '죄송해요. 다시 들려 주실래요?',
    '제가 제대로 이해하지 못한것 같아요. 죄송해요.',
    '조금 헷갈리는데요.',
    '마지막에 말씀을 잘 못 이해 한것 같아요.'
];
class ChatController {
    constructor() {
    }
    static add(userId, chatText) {
        return new Promise((resolve, reject) => {
            chatService_1.default.addChat(userId, chatText).then((data) => {
                for (let value of unknownChatList) {
                    if (value === data['result']['speech']) {
                        data['result']['speech'] = '학학학학학!';
                        break;
                    }
                }
                resolve(data);
            }).catch((error) => {
                reject(error);
            });
        });
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
