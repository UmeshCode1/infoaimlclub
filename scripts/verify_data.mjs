import { Client, Databases } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

async function verify() {
    try {
        const response = await databases.listDocuments('main', 'community_links');
        console.log(`📊 Documents found in community_links: ${response.total}`);
        response.documents.forEach(doc => {
            console.log(`   - [${doc.key}] ${doc.title} (${doc.url})`);
        });
    } catch (e) {
        console.error('❌ Verification failed:', e.message);
    }
}

verify();
