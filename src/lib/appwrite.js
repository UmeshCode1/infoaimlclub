import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

// Ping the Appwrite backend server to verify the setup
client.ping().then(() => {
    console.log("Appwrite connection verified (Ping successful)");
}).catch((error) => {
    console.error("Appwrite connection failed:", error);
});

export { client, account, databases };
