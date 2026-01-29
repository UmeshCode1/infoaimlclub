import { Client, Databases, ID } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DB_ID = 'main';
const COLL_LINKS = 'community_links';

async function seed() {
    const links = [
        { key: 'instagram', title: 'Instagram', url: 'https://www.instagram.com/aimlclub.oct', category: 'community', visibility: 'public', order: 1 },
        { key: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/company/aimlclub-oct', category: 'community', visibility: 'public', order: 2 },
        { key: 'github', title: 'GitHub', url: 'https://github.com/aimlclub-oct', category: 'community', visibility: 'public', order: 3 },
        { key: 'whatsapp', title: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029Va9l2XzH5JM3SjBf9U1x', category: 'community', visibility: 'public', order: 4 },
        { key: 'blog', title: 'Official Blog', url: 'https://blog.aimlclub.tech', category: 'core', visibility: 'public', order: 5 },
        { key: 'contact', title: 'Contact Us', url: 'mailto:aimlclub@oriental.ac.in', category: 'core', visibility: 'public', order: 6 }
    ];

    console.log('🌱 Checking collection status...');

    // Wait for attributes to be ready (Appwrite creates them asynchronously)
    console.log('⏳ Waiting for attributes to propagate...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('🌱 Seeding initial links...');
    for (const link of links) {
        try {
            await databases.createDocument(DB_ID, COLL_LINKS, ID.unique(), {
                ...link,
                active: true
            });
            console.log(`✅ Seeded: ${link.title}`);
        } catch (e) {
            console.error(`❌ Failed to seed ${link.title}:`, e.message);
        }
    }
}

seed();
