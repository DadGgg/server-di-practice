import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Account } from "../infrastructure/models/Account";
import { Request } from "express";
import { inject } from "inversify";
import { TYPES } from "../TYPES";
import { Repository } from "typeorm";
import { IAccountService } from "../application/AccountService";

@controller("/accounts")
export default class AccountController extends BaseHttpController {
    service: IAccountService;
    constructor(@inject(TYPES.IAccountService) service: IAccountService) {
        super();
        this.service = service;
    }
    @httpGet("/")
    private getAccounts(request: Request) {
        
        return this.service.getAccounts();
    }
    @httpPost("/")
    private createAccount(request: Request) {
        const newAccount = request.body as Account;
        return this.service.createAccount(newAccount);
    }
    @httpPut("/:id")
    private updateAccount(request: Request) {
        const account = request.body as Account;
        return this.service.putAccount(account);
    }
    @httpDelete("/:id")
    private deleteAccount(request: Request) {
       
        return this.service.deleteAccount(+request.params.id);
    }

}