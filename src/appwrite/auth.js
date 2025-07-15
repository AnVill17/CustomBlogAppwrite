import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";


export class AuthServices{
    client = new Client()
    account
    constructor(){
        this.client
          .setEndpoint(conf.appwriteUrl)
          .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);

    }
    async createAccount(username,email,password){
        try {
            const userAccount=await this.account.create(ID.unique(), email, password, username);
            if (userAccount) {
                // call another method
                return this.loginUser({email, password});
            } else {
               return  userAccount;}

        } catch (error) {
            throw error
        }
    }
    async loginUser({ email, password }){
        try {
            return await this.account.createEmailPasswordSession(email,password);

        } catch (error) {
            throw error
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }
    }
    async logoutUser(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}
const authServices=new AuthServices()

export default authServices