import { Client, Databases, ID } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("697bdf630039dcd6007e")
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DB_ID = 'main';
const COLL_LINKS = 'community_links';
const COLL_EVENTS = 'events';
const COLL_ANNOUNCEMENTS = 'announcements';
const COLL_RESOURCES = 'resources';

async function seed() {
    console.log('🚀 Seeding Comprehensive Production Data...');

    // 1. Mandatory Core & Community Links
    const links = [
        { key: 'website', title: 'Official Website', url: 'https://www.aimlclub.tech', category: 'core', visibility: 'public', order: 1 },
        { key: 'blog', title: 'Knowledge Blog', url: 'https://blog.aimlclub.tech', category: 'core', visibility: 'public', order: 2 },
        { key: 'contact', title: 'Official Contact', url: 'mailto:aimlclub@oriental.ac.in', category: 'core', visibility: 'public', order: 3 },
        { key: 'suggestions', title: 'SOP & Feedback', url: 'https://tally.so/r/n0D6m0', category: 'core', visibility: 'public', order: 4 },

        { key: 'instagram', title: 'Instagram Feed', url: 'https://www.instagram.com/aimlclub.oct', category: 'community', visibility: 'public', order: 5 },
        { key: 'linkedin', title: 'LinkedIn Network', url: 'https://www.linkedin.com/company/aimlclub-oct', category: 'community', visibility: 'public', order: 6 },
        { key: 'github', title: 'GitHub Repo', url: 'https://github.com/aimlclub-oct', category: 'community', visibility: 'public', order: 7 },
        { key: 'whatsapp', title: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029Va9l2XzH5JM3SjBf9U1x', category: 'community', visibility: 'public', order: 8 },

        { key: 'media-drive', title: 'Media Assets Drive', url: 'https://drive.google.com/drive/folders/community', category: 'resources', visibility: 'public', order: 9 },
        { key: 'photopia', title: 'Photopia Sub-brand', url: 'https://www.instagram.com/photopia.aiml', category: 'subbrand', visibility: 'public', order: 10 },
    ];

    // 2. Active Event (Example of Live Activation)
    const activeEvent = {
        event_id: 'codify-2026',
        title: 'Codify Workshop 2026',
        starts_at: new Date().toISOString(),
        ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        active: true
    };

    // 3. Event Specific Links (Will appear in the Event Blade)
    const eventLinks = [
        { key: 'event-group', title: 'Join Event WhatsApp', url: 'https://chat.whatsapp.com/example', category: 'event', visibility: 'restricted', event_id: 'codify-2026', order: 100 },
        { key: 'event-notes', title: 'Workshop Notes (PDF)', url: 'https://info.aimlclub.tech/notes.pdf', category: 'event', visibility: 'public', event_id: 'codify-2026', order: 101 }
    ];

    // 4. Global Announcement
    const announcement = {
        message: 'System Migration Successful. info.aimlclub.tech is now running on the v2.5 Governance Protocol.',
        starts_at: new Date().toISOString(),
        ends_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        active: true
    };

    // 5. Governance Resources
    const resources = [
        { title: 'AIML Club Constitution 2026', type: 'link', url: 'https://docs.google.com/constitution', visibility: 'public', active: true },
        { title: 'Faculty Oversight Manual', type: 'link', url: 'https://docs.google.com/faculty', visibility: 'public', active: true }
    ];

    try {
        // Seed Links
        for (const link of [...links, ...eventLinks]) {
            await databases.createDocument(DB_ID, COLL_LINKS, ID.unique(), { ...link, active: true });
            console.log(`✅ Seeded Link: ${link.title}`);
        }

        // Seed Event
        await databases.createDocument(DB_ID, COLL_EVENTS, ID.unique(), activeEvent);
        console.log(`✅ Seeded Event: ${activeEvent.title}`);

        // Seed Announcement
        await databases.createDocument(DB_ID, COLL_ANNOUNCEMENTS, ID.unique(), announcement);
        console.log(`✅ Seeded Announcement`);

        // Seed Resources
        for (const res of resources) {
            await databases.createDocument(DB_ID, COLL_RESOURCES, ID.unique(), res);
            console.log(`✅ Seeded Resource: ${res.title}`);
        }

        console.log('🎉 Production Data Seeding Complete!');
    } catch (e) {
        console.error('❌ Seeding Error:', e.message);
    }
}

seed();
