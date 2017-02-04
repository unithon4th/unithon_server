/** Internal dependencies **/
import ChatService from './../services/chatService';

let unknownChatList = [
    '방금 하신 말씀을 잘 못 알아들었어요.',
    '죄송해요. 다시 들려 주실래요?',
    '제가 제대로 이해하지 못한것 같아요. 죄송해요.',
    '제가 제대로 이해하고 있는지 잘 모르겠어요.',
    '조금 헷갈리는데요.',
    '마지막에 말씀을 잘 못 이해 한것 같아요.',
    '죄송해요. 다시 들려 주실래요?',
];

let dontKnowList = [
    '...못 알아 듣겠다보탑',
    '바보라서 모른다보탑',
    '나는 바보인가보다보탑',
    '그런 말 모른다보탑',
    '죄송하다보탑 모르겠다보탑'
];

let randNumArr = [1, 2, 3, 4, 5, 6, 7];

export default class ChatController {
    constructor() {

    }

    static add(userId, chatText) {
        return new Promise((resolve, reject) => {
            ChatService.addChat(userId, chatText).then((data) => {
                for (let i = 0; i < unknownChatList.length; i++) {
                    if (unknownChatList[i] === data['result']['speech']) {
                        data['result']['speech'] = dontKnowList[Math.floor(Math.random() * dontKnowList.length)];
                        data['result']['category'] = '다보탑';
                        break;
                    }
                }
                /*
                 아는 말이 나왔을때 => 세종(알림)인지 심사임당(읽어오기)
                 */
                if (data['result']['category'] !== '다보탑') { // 알림 or 읽어오기
                    let endFlag = false;
                    // 읽어오기 => 임당
                    let reqStr = data['result']['resolvedQuery'];
                    if (reqStr.includes('알려줘')) {
                        data['result']['speech'] += '임당';
                        endFlag = true;
                    };
                    // 등록
                    if (!endFlag && reqStr.includes('알림') || reqStr.includes('등록') ) {
                        endFlag = true;
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

    static readChat(userId){
        return ChatService.readUser(userId);
    }

}
