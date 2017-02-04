/** Internal dependencies **/
import UserService from './../services/userService';

var request = require('request');

export default class ChatController {

    constructor() {

    }

    static test(userId, chatText){
        return new Promise( (resolve, reject) => {
            request.get(
                {
                    url: 'https://api.api.ai/v1/query',
                    headers: {
                        'Authorization': 'Bearer 24a5576f040d49c1a45552a11334dc86'
                    },
                    qs: {
                        'query': chatText,
                        'lang': 'kr',
                        'sessionId': '1234' 
                    }
                },
                (error, response, body) => {
                    console.log(body)
                    console.log(response.statusCode)
                    if (!error && response.statusCode == 200){
                        resolve(JSON.parse(body))
                    }
                    else{
                        reject(error)
                    }
                }
            );
            
        }) 
            
    }

    static executeNlp(responseJson){

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
