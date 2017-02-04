/** Internal dependencies **/
import BankService from './../services/bankService';

export default class BankController {

    constructor() {

    }

    static read(userId){
        return BankService.read(userId);

    }

    static withdraw(fromId, toId, amount){
        return BankService.withdraw(fromId, toId, amount);
    }
    
    static deposit(userId, amount){
        return BankService.deposit(userId, amount);

    }

}
