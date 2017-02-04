/** Internal dependencies **/
import ChatService from './../services/chatService';

export default class ChatController {

    constructor() {

    }

    static add(userId, chatText){
        return ChatService.addChat(userId, chatText);
        /*
        return new Promise( (resolve, reject) => {
            ChatService.addChat(userId, 'bot', chatText);
            ChatService.addChat('bot', userId, this.excuteNlp(chatText));
            resolve();
        });*/
    }

    static readChat(userId){
        return ChatService.readUser(userId);
    }

}
