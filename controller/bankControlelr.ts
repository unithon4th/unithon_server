/** Internal dependencies **/
import BankService from './../services/bankService';

export default class BankController {

    constructor() {

    }

    static read(userId){
        return BankService.read(userId);

    }

    static withdraw(fromId, toId, amount, name, date){
        return BankService.withdraw(fromId, toId, amount, name, date);
    }
    
    static deposit(userId, amount, name, date){
        return BankService.deposit(userId, amount, name, date);

    }

}
