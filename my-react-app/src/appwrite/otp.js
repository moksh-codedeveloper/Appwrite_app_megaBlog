import { Client, Account} from "appwrite";
import conf from '../conf/conf'
const client = new Client()
                            .setEndpoint(conf.appwriteUrl)
                            .setEndpoint(conf.appwriteProjectId);

const account = new Account(client);

const sendOtp = async (emailId) => {
    try {
        const sessionToken = await account.createEmailToken(emailId);
        return sessionToken.userId;
    } catch (error) {
        console.error('Error creating session:', error);
    }
}
const verifyOtp = async (secret, userId) => {
    try {
        const sessionToken = await account.updateVerification(
            userId,
            secret
        );
        return sessionToken;
    } catch (error) {
        console.error('Error creating session:', error);
    }
}

export {verifyOtp, sendOtp};