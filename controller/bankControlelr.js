"use strict";
/** Internal dependencies **/
const bankService_1 = require("./../services/bankService");
class BankController {
    constructor() {
    }
    static read(userId) {
        return bankService_1.default.read(userId);
    }
    static withdraw(fromId, toId, amount) {
        return bankService_1.default.withdraw(fromId, toId, amount);
    }
    static deposit(userId, amount) {
        return bankService_1.default.deposit(userId, amount);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BankController;
