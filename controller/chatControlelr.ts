/** Internal dependencies **/
import UserService from './../services/userService';
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


    static createUser(username, password) {
        return UserService.createUser(username, password);
    }

    static readUser(id) {
        return UserService.readUser(id);
    }

    static updateUser(userID, user) {
        return UserService.updateUser(userID, user);
    }

    static deleteUser(id) {
        return UserService.deleteUser(id);
    }

}
