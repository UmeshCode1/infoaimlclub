import { Client, Account, Databases } from "appwrite";

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("697bdf630039dcd6007e");

const account = new Account(client);
const databases = new Databases(client);

// Ping the Appwrite backend server to verify the setup
client.ping().then(() => {
    console.log("Appwrite connection verified (Ping successful)");
}).catch((error) => {
    console.error("Appwrite connection failed:", error);
});

export { client, account, databases };
