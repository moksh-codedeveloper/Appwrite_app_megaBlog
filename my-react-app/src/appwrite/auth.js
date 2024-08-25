import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
                    .setEndpoint(conf.appwriteUrl)
                    .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                return this.login({email, password});
            } else {
                // throw new Error("Failed to create user.");
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);

        } catch (error) {
            console.log("failed to login", error);
            throw error; 
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("current user not found", error);            
            // throw error;
        }
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("failed to logout", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
