import { Client, Databases, Teams, ID, Permission, Role } from 'node-appwrite';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

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
    console.log('🚀 Starting Appwrite Setup...');

    try {
        // 1. Create Teams
        const teamNames = [
            'AIML_ADMIN', 'AIML_FACULTY', 'AIML_CORE',
            'AIML_EVENTS', 'AIML_TECH', 'AIML_DISCIPLINE',
            'AIML_MEDIA', 'AIML_ANCHORS'
        ];

        for (const name of teamNames) {
            try {
                await teams.create(name, name);
                console.log(`✅ Created Team: ${name}`);
            } catch (e) {
                if (e.code === 409) console.log(`ℹ️ Team already exists: ${name}`);
                else throw e;
            }
        }

        // 2. Create Database
        try {
            await databases.create(DB_ID, 'Main Database');
            console.log(`✅ Created Database: ${DB_ID}`);
        } catch (e) {
            if (e.code === 409) console.log(`ℹ️ Database already exists: ${DB_ID}`);
            else throw e;
        }

        // 3. Create Collections
        const collections = [
            {
                id: COLL_MEMBERS,
                name: 'Members',
                permissions: [
                    Permission.read(Role.team('AIML_ADMIN')),
                    Permission.write(Role.team('AIML_ADMIN'))
                ],
                attributes: [
                    { key: 'name', type: 'string', size: 255, required: true },
                    { key: 'enrollment_no', type: 'string', size: 100, required: false },
                    { key: 'role', type: 'string', size: 100, required: true },
                    { key: 'team', type: 'string', size: 100, required: true },
                    { key: 'email', type: 'string', size: 255, required: true },
                    { key: 'contact', type: 'string', size: 20, required: false },
                    { key: 'type', type: 'string', size: 20, required: true }, // faculty | student
                    { key: 'active', type: 'boolean', required: true, default: true }
                ]
            },
            {
                id: COLL_LINKS,
                name: 'Community Links',
                permissions: [
                    Permission.read(Role.any()),
                    Permission.write(Role.team('AIML_ADMIN'))
                ],
                attributes: [
                    { key: 'key', type: 'string', size: 100, required: true },
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'url', type: 'string', size: 1024, required: true },
                    { key: 'category', type: 'string', size: 50, required: true },
                    { key: 'visibility', type: 'string', size: 20, required: true }, // public | restricted
                    { key: 'event_id', type: 'string', size: 100, required: false },
                    { key: 'order', type: 'integer', required: true, default: 0 },
                    { key: 'active', type: 'boolean', required: true, default: true }
                ]
            },
            {
                id: COLL_EVENTS,
                name: 'Events',
                permissions: [
                    Permission.read(Role.any()),
                    Permission.write(Role.team('AIML_ADMIN'))
                ],
                attributes: [
                    { key: 'event_id', type: 'string', size: 100, required: true },
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'starts_at', type: 'datetime', required: true },
                    { key: 'ends_at', type: 'datetime', required: true },
                    { key: 'active', type: 'boolean', required: true, default: true }
                ]
            },
            {
                id: COLL_ANNOUNCEMENTS,
                name: 'Announcements',
                permissions: [
                    Permission.read(Role.any()),
                    Permission.write(Role.team('AIML_ADMIN'))
                ],
                attributes: [
                    { key: 'message', type: 'string', size: 2000, required: true },
                    { key: 'starts_at', type: 'datetime', required: true },
                    { key: 'ends_at', type: 'datetime', required: true },
                    { key: 'active', type: 'boolean', required: true, default: true }
                ]
            },
            {
                id: COLL_RESOURCES,
                name: 'Resources',
                permissions: [
                    Permission.read(Role.any()),
                    Permission.write(Role.team('AIML_ADMIN'))
                ],
                attributes: [
                    { key: 'title', type: 'string', size: 255, required: true },
                    { key: 'type', type: 'string', size: 20, required: true }, // file | link
                    { key: 'file_id', type: 'string', size: 100, required: false },
                    { key: 'url', type: 'string', size: 1024, required: false },
                    { key: 'visibility', type: 'string', size: 20, required: true }, // public | restricted
                    { key: 'event_id', type: 'string', size: 100, required: false },
                    { key: 'active', type: 'boolean', required: true, default: true }
                ]
            }
        ];

        for (const col of collections) {
            try {
                await databases.createCollection(DB_ID, col.id, col.name, col.permissions);
                console.log(`✅ Created Collection: ${col.name}`);

                // Add attributes
                for (const attr of col.attributes) {
                    if (attr.type === 'string') {
                        await databases.createStringAttribute(DB_ID, col.id, attr.key, attr.size, attr.required, attr.default);
                    } else if (attr.type === 'boolean') {
                        await databases.createBooleanAttribute(DB_ID, col.id, attr.key, attr.required, attr.default);
                    } else if (attr.type === 'integer') {
                        await databases.createIntegerAttribute(DB_ID, col.id, attr.key, attr.required, 0, 1000, attr.default);
                    } else if (attr.type === 'datetime') {
                        await databases.createDatetimeAttribute(DB_ID, col.id, attr.key, attr.required, attr.default);
                    }
                    console.log(`   - Attribute created: ${attr.key}`);
                }
            } catch (e) {
                if (e.code === 409) console.log(`ℹ️ Collection already exists: ${col.name}`);
                else console.error(`❌ Error creating ${col.name}:`, e.message);
            }
        }

        console.log('🎉 Setup Complete!');

    } catch (error) {
        console.error('❌ Setup Failed:', error);
    }
}

setup();
