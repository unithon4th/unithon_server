/**
 * Copyright (c) 2016 timeros -
 *
 * @author yuhogyun
 **/

/** External dependencies **/
const request = require('request');

/** Internal dependencies **/

export default class RequestService {
    constructor() {

    }
    static requestHTTP(url, token) {
        let options = {
            url: url,
            headers: {'Authorization': 'Bearer ' + token}
        };

        return new Promise((resolve, reject) => {
            request(options, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    resolve(JSON.parse(body));
                }else {
                    reject(error);
                }
            });
        });
    }
}
