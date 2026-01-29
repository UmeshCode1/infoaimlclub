import { Client, Databases, Teams, ID, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const teams = new Teams(client);

const DB_ID = 'main';
const COLL_MEMBERS = 'members';
const COLL_LINKS = 'community_links';
const COLL_EVENTS = 'events';
const COLL_ANNOUNCEMENTS = 'announcements';
const COLL_RESOURCES = 'resources';

async function setup() {
    console.log('🚀 Starting Full Appwrite Infrastructure Sync...');

    try {
        const teamNames = ['AIML_ADMIN', 'AIML_FACULTY', 'AIML_CORE', 'AIML_EVENTS', 'AIML_TECH', 'AIML_DISCIPLINE', 'AIML_MEDIA', 'AIML_ANCHORS'];
        for (const name of teamNames) {
            try { await teams.create(name, name); console.log(`✅ Team: ${name}`); } catch (e) { if (e.code !== 409) throw e; }
        }

        try { await databases.create(DB_ID, 'Main Database'); console.log(`✅ Database: ${DB_ID}`); } catch (e) { if (e.code !== 409) throw e; }

        const collections = [
            {
                id: COLL_MEMBERS, name: 'Members',
                permissions: [Permission.read(Role.team('AIML_ADMIN')), Permission.write(Role.team('AIML_ADMIN'))],
                attributes: [
                    { key: 'name', type: 'string', size: 255, required: true },
                    { key: 'enrollment_no', type: 'string', size: 100, required: false },
                    { key: 'role', type: 'string', size: 100, required: true },
                    { key: 'team', type: 'string', size: 100, required: true },
                    { key: 'email', type: 'string', size: 255, required: true },
                    { key: 'contact', type: 'string', size: 20, required: false },
                    { key: 'type', type: 'string', size: 20, required: true },
                    { key: 'active', type: 'boolean', required: false, default: true }
                ]
            },
            {
                id: COLL_LINKS, name: 'Community Links',
                permissions: [Permission.read(Role.any()), Permission.write(Role.team('AIML_ADMIN'))],
                attributes: [
                    { key: 'key', type: 'string', size: 100, required: true },
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'url', type: 'string', size: 1024, required: true },
                    { key: 'category', type: 'string', size: 50, required: true },
                    { key: 'visibility', type: 'string', size: 20, required: true },
                    { key: 'event_id', type: 'string', size: 100, required: false },
                    { key: 'order', type: 'integer', required: false, default: 0 },
                    { key: 'active', type: 'boolean', required: false, default: true }
                ]
            },
            {
                id: COLL_ANNOUNCEMENTS, name: 'Announcements',
                permissions: [Permission.read(Role.any()), Permission.write(Role.team('AIML_ADMIN'))],
                attributes: [
                    { key: 'message', type: 'string', size: 2000, required: true },
                    { key: 'starts_at', type: 'datetime', required: true },
                    { key: 'ends_at', type: 'datetime', required: true },
                    { key: 'active', type: 'boolean', required: false, default: true }
                ]
            }
        ];

        for (const col of collections) {
            try {
                await databases.createCollection(DB_ID, col.id, col.name, col.permissions);
                console.log(`✅ Collection: ${col.name}`);
            } catch (e) {
                if (e.code === 409) console.log(`ℹ️ Collection exists: ${col.name}`);
                else throw e;
            }

            const existingAttrs = await databases.listAttributes(DB_ID, col.id);
            const existingKeys = existingAttrs.attributes.map(a => a.key);

            for (const attr of col.attributes) {
                if (!existingKeys.includes(attr.key)) {
                    console.log(`   ➕ Adding attribute to ${col.id}: ${attr.key}...`);
                    if (attr.type === 'string') {
                        await databases.createStringAttribute(DB_ID, col.id, attr.key, attr.size, attr.required, attr.default);
                    } else if (attr.type === 'integer') {
                        await databases.createIntegerAttribute(DB_ID, col.id, attr.key, attr.required, 0, 10000, attr.default);
                    } else if (attr.type === 'boolean') {
                        await databases.createBooleanAttribute(DB_ID, col.id, attr.key, attr.required, attr.default ?? true);
                    } else if (attr.type === 'datetime') {
                        await databases.createDatetimeAttribute(DB_ID, col.id, attr.key, attr.required, attr.default);
                    }
                    await new Promise(r => setTimeout(r, 1000));
                }
            }
        }

        console.log('🎉 Infrastructure sync complete!');
    } catch (error) {
        console.error('❌ Setup Failed:', error);
    }
}

setup();
