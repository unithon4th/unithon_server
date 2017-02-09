/** Internal dependencies **/
import ChatService from './../services/chatService';
import BankService from './../services/bankService';

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
                let type = '';
                if (data['result']['parameters']['card']) type += data['result']['parameters']['card'];
                else if (data['result']['parameters']['elec']) type += data['result']['parameters']['elec'];
                else if (data['result']['parameters']['gas']) type += data['result']['parameters']['gas'];
                else if (data['result']['parameters']['water']) type += data['result']['parameters']['water'];

                for (let i = 0; i < unknownChatList.length; i++) {
                    if (unknownChatList[i] === data['result']['speech']) {
                        data['result']['speech'] = dontKnowList[Math.floor(Math.random() * dontKnowList.length)];
                        data['result']['category'] = '다보탑';
                        break;
                    }
                }
                resolve(data);
                /*
                 아는 말이 나왔을때 => 세종(알림)인지 심사임당(읽어오기)
                 */
                /*
                if (data['result']['category'] !== '다보탑') { // 알림 or 읽어오기
                    this.imdang(data, type, userId).then((result) => {
                        resolve(result);
                    }).catch(() => {
                        reject();
                    });
                } else {
                    resolve(data);
                }
                */
            }).catch((error) => {
                console.log(error);
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
        return ChatService.readUser(userId);
    }

    static imdang(data, type, userId) {
        return new Promise((resolve, reject) => {
            data['result']['category'] = '심사임당';
            let endFlag = false;
            // 읽어오기 => 임당
            let reqStr = data['result']['resolvedQuery'];
            if (reqStr.includes('알려줘')) {
                data['result']['speech'] += ' ' + type + '은(는)';
                // resolve
                data['result']['speech'] += ' 임당';
                endFlag = true;
            };

            // 등록
            if (!endFlag && reqStr.includes('알림') || reqStr.includes('등록') ) {
                resolve('알림을 등록하였습니다.');
            }

            // 공과금
            /*
            BankService.imdang(data, type, userId).then((item) => {
                // console.log('item');
                // console.log(item);
            }).catch((err) => {
                // console.log('error');
                // console.log(err);
            });
            */

            resolve(data);


        });
    }

}
