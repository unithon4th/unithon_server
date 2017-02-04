"use strict";
/** Internal dependencies **/
const bankService_1 = require("./../services/bankService");
class BankController {
    constructor() {
    }
    static read(userId) {
        return bankService_1.default.read(userId);
    }
    static deposit(fromId, toId, amount) {
        return bankService_1.default.deposit(fromId, toId, amount);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BankController;
