"use strict";
/** Internal dependencies **/
const userService_1 = require("./../services/userService");
var request = require('request');
class ChatController {
    constructor() {
    }
    static test(userId, chatText) {
        return new Promise((resolve, reject) => {
            request.get({
                url: 'https://api.api.ai/v1/query',
                headers: {
                    'Authorization': 'Bearer 24a5576f040d49c1a45552a11334dc86'
                },
                qs: {
                    'query': chatText,
                    'lang': 'kr',
                    'sessionId': '1234'
                }
            }, (error, response, body) => {
                console.log(body);
                console.log(response.statusCode);
                if (!error && response.statusCode == 200) {
                    resolve(JSON.parse(body));
                }
                else {
                    reject(error);
                }
            });
        });
    }
    static executeNlp(responseJson) {
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
