/** Internal dependencies **/
import BankService from './../services/bankService';

export default class BankController {

    constructor() {

    }

    static read(userId){
        return BankService.read(userId);

    }
    
    static deposit(fromId, toId, amount){
        return BankService.deposit(fromId, toId, amount);

    }

}
