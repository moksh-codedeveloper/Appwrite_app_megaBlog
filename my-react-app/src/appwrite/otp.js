import { Client, Account} from "appwrite";
import conf from '../conf/conf'
const client = new Client()
                            .setEndpoint(conf.appwriteUrl)
                            .setEndpoint(conf.appwriteProjectId);

const account = new Account(client);

const sendOtp = async (slug, emailId) => {
    try {
        const sessionToken = await account.createEmailToken(
            slug,
            emailId
        );
        return sessionToken.userId;
    } catch (error) {
        console.error('Error creating session:', error);
    }
}
const verifyOtp = async (userId, emailId) => {
    try {
        const sessionToken = await account.createEmailVerificationToken(
            userId,
            emailId,
        );
        return sessionToken.userId;
    } catch (error) {
        console.error('Error creating session:', error);
    }
}