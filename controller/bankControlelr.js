"use strict";
/** Internal dependencies **/
const bankService_1 = require("./../services/bankService");
class BankController {
    constructor() {
    }
    static read(userId) {
        return bankService_1.default.read(userId);
    }
    static withdraw(fromId, toId, amount, name, date) {
        return bankService_1.default.withdraw(fromId, toId, amount, name, date);
    }
    static deposit(userId, amount, name, date) {
        return bankService_1.default.deposit(userId, amount, name, date);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BankController;
