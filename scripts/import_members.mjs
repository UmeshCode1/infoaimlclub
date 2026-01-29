import { Client, Databases, ID } from 'node-appwrite';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DB_ID = 'main';
const COLL_MEMBERS = 'members';

async function importMembers() {
    const rawData = fs.readFileSync('src/data/members.json');
    const members = JSON.parse(rawData);

    console.log(`🚀 Importing ${members.length} members into Appwrite...`);

    // Check if collection is ready
    try {
        await databases.getCollection(DB_ID, COLL_MEMBERS);
    } catch (e) {
        console.error('❌ Members collection not found. Run setup first.');
        return;
    }

    for (const member of members) {
        try {
            // Check if member already exists by email
            const existing = await databases.listDocuments(DB_ID, COLL_MEMBERS, [
                // Note: Querying by email requires an index, which the setup script might not have created yet.
                // For seeding, we'll just insert unless we implement index checking.
            ]);

            await databases.createDocument(DB_ID, COLL_MEMBERS, ID.unique(), member);
            console.log(`✅ Imported: ${member.name} (${member.role})`);
        } catch (e) {
            console.error(`❌ Failed to import ${member.name}:`, e.message);
        }
    }
    console.log('🎉 Member import complete!');
}

importMembers();
