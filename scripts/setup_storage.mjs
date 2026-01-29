import { Client, Storage, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const storage = new Storage(client);

async function setupStorage() {
    console.log('🚀 Setting up Storage Buckets...');

    const BUCKET_ID = 'resources';
    const BUCKET_NAME = 'Project Resources';

    try {
        await storage.createBucket(BUCKET_ID, BUCKET_NAME, [
            Permission.read(Role.any()),
            Permission.write(Role.team('AIML_ADMIN'))
        ], false, true, true, ['jpg', 'png', 'svg', 'pdf', 'doc', 'docx', 'ppt', 'pptx']);
        console.log(`✅ Created Bucket: ${BUCKET_NAME}`);
    } catch (e) {
        if (e.code === 409) console.log(`ℹ️ Bucket already exists: ${BUCKET_NAME}`);
        else console.error(`❌ Failed to create bucket:`, e.message);
    }
}

setupStorage();
