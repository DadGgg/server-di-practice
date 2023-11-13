import { Repository } from "typeorm";
import { TYPES } from "../TYPES";
import { Account } from "../infrastructure/models/Account";
import { inject, injectable } from "inversify";

export interface IAccountService{
    createAccount(account: Account): Promise<Account>;
    getAccounts(): Promise<Account[]>;
    putAccount(account: Account): Promise<Account>;
    deleteAccount(id: number): Promise<boolean>;
}

@injectable()
export class AccountService implements IAccountService{
    repo: Repository<Account>;
    constructor(@inject(TYPES.AccountDataRepo) repo: Repository<Account>){
        this.repo = repo;
    }

    createAccount(newAccount: Account): Promise<Account> {
            //business logic here
       return this.repo.save(newAccount)
    }

    getAccounts(): Promise<Account[]> {
        return this.repo.find()
    }
    
    putAccount(account: Account): Promise<Account> {
        return this.repo.save(account)
    }

    deleteAccount(id: number):Promise<boolean> {

        return this.repo.delete(id).then(() => {
            return true;
        }).catch(() => {
            return false;
        })
    }
}