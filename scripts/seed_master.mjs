import { Client, Databases, Teams, Storage, ID, Permission, Role, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const teams = new Teams(client);
const storage = new Storage(client);

const DB_ID = 'main';
const COLLS = {
    members: 'members',
    links: 'community_links',
    events: 'events',
    announcements: 'announcements',
    resources: 'resources'
};

const TEAM_IDS = ['AIML_ADMIN', 'AIML_FACULTY', 'AIML_CORE', 'AIML_EVENTS', 'AIML_TECH', 'AIML_DISCIPLINE', 'AIML_MEDIA', 'AIML_ANCHORS'];

// Helper to wait
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function masterSeed() {
    console.log('🚀 Initiating MASTER GOVERNANCE SEED (Phase 1: Schema & Data)...');

    // 0. Ensure Database Exists
    try {
        await databases.get(DB_ID);
        console.log(`✅ Database '${DB_ID}' connected.`);
    } catch {
        console.error(`❌ Database '${DB_ID}' not found. Please create it manually if it doesn't exist.`);
        return;
    }

    // 1. Teams Setup
    for (const teamId of TEAM_IDS) {
        try {
            await teams.get(teamId);
            console.log(`✅ Team Exists: ${teamId}`);
        } catch (e) {
            try {
                await teams.create(teamId, teamId);
                console.log(`✅ Team Created: ${teamId}`);
            } catch (createErr) {
                console.log(`⚠️ Team Issue ${teamId}: ${createErr.message}`);
            }
        }
    }

    // 2. Collections & Attributes
    const requiredCollections = [
        {
            id: COLLS.members,
            name: "Members",
            attributes: [
                { key: "name", type: "string", size: 255, required: true },
                { key: "enrollment_no", type: "string", size: 50, required: false }, // Enforced Spec
                { key: "role", type: "string", size: 100, required: true },
                { key: "team", type: "string", size: 50, required: true },
                { key: "email", type: "string", size: 255, required: true },
                { key: "contact", type: "string", size: 50, required: false }, // Enforced Spec
                { key: "type", type: "string", size: 50, required: true },
                { key: "active", type: "boolean", required: true, default: true }
            ]
        },
        {
            id: COLLS.links,
            name: "Community Links",
            attributes: [
                { key: "key", type: "string", size: 50, required: true },
                { key: "title", type: "string", size: 255, required: true },
                { key: "url", type: "string", size: 1000, required: true },
                { key: "category", type: "string", size: 50, required: true },
                { key: "visibility", type: "string", size: 50, required: true, default: "public" }, // Enforced Spec
                { key: "order", type: "integer", required: false, default: 0 },
                { key: "active", type: "boolean", required: true, default: true }
            ]
        }
    ];

    for (const schema of requiredCollections) {
        try {
            await databases.createCollection(DB_ID, schema.id, schema.name, [
                Permission.read(Role.any()), // Public Read-Only
                Permission.write(Role.team('AIML_ADMIN')), // Admin Write
                Permission.update(Role.team('AIML_ADMIN')),
                Permission.delete(Role.team('AIML_ADMIN'))
            ]);
            console.log(`✅ Collection Created: ${schema.name}`);
        } catch (e) {
            if (e.code === 409) console.log(`✅ Collection Exists: ${schema.name}`);
            else console.error(`❌ Collection Error ${schema.name}: ${e.message}`);
        }

        // Create Attributes
        console.log(`   Verifying Schema for ${schema.name}...`);
        for (const attr of schema.attributes) {
            try {
                if (attr.type === 'string') {
                    await databases.createStringAttribute(DB_ID, schema.id, attr.key, attr.size, attr.required, attr.default);
                } else if (attr.type === 'boolean') {
                    await databases.createBooleanAttribute(DB_ID, schema.id, attr.key, attr.required, attr.default);
                } else if (attr.type === 'integer') {
                    await databases.createIntegerAttribute(DB_ID, schema.id, attr.key, attr.required, 0, 2147483647, attr.default);
                }
                process.stdout.write(`.`);
                await sleep(200); // Rate limit buffer
            } catch (e) {
                // Ignore attribute exists error
            }
        }
        console.log(` Done.`);
        await sleep(1000); // Wait for attributes to index
    }

    // 3. Clear Existing Data (Optional - Safety first, maybe just upsert?)
    // For this strict audit, we typically want a clean slate or smart update. 
    // We will list and delete existing to ensure strict sync with spec.
    console.log('🧹 Cleaning Stale Data (Strict Mode)...');
    try {
        const existingMembers = await databases.listDocuments(DB_ID, COLLS.members, [Query.limit(100)]);
        for (const doc of existingMembers.documents) {
            await databases.deleteDocument(DB_ID, COLLS.members, doc.$id);
        }
        const existingLinks = await databases.listDocuments(DB_ID, COLLS.links, [Query.limit(100)]);
        for (const doc of existingLinks.documents) {
            await databases.deleteDocument(DB_ID, COLLS.links, doc.$id);
        }
        console.log('✅ Data Purged for Clean Injection.');
    } catch (e) {
        console.error('⚠️ Clean Error:', e.message);
    }
    await sleep(2000);

    // 4. Inject 43 Members
    // Using Placeholders for enrollment_no/contact as per strict schema requirement but missing input data
    const memberDefaults = { enrollment_no: "OCT-0000", contact: "+91-0000000000" };

    const members = [
        // Faculty
        { name: "Prof. Shamaila Khan", role: "Faculty Coordinator", team: "AIML_FACULTY", type: "faculty", email: "shamaila.khan@oriental.ac.in", active: true },
        // Core
        { name: "Vishal Kumar", role: "President", team: "AIML_CORE", type: "student", email: "vishal.kumar@example.com", active: true },
        { name: "Umesh Patel", role: "Vice President", team: "AIML_CORE", type: "student", email: "umesh.code1@gmail.com", active: true },
        // Events
        { name: "Gourav Jain", role: "Event Lead", team: "AIML_EVENTS", type: "student", email: "gourav.jain@example.com", active: true },
        { name: "Aarchi Sharma", role: "Coordinator", team: "AIML_EVENTS", type: "student", email: "aarchi.sharma@example.com", active: true },
        { name: "Parul Ajit", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "parul.ajit@example.com", active: true },
        { name: "Anjali Sonare", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "anjali.sonare@example.com", active: true },
        { name: "Aanya Tomar", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "aanya.tomar@example.com", active: true },
        { name: "Bhavesh Singh", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "bhavesh.singh@example.com", active: true },
        { name: "Tanu Jadon", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "tanu.jadon@example.com", active: true },
        { name: "Sarvesh Sejwar", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "sarvesh.sejwar@example.com", active: true },
        { name: "Nasir Khan", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "nasir.khan@example.com", active: true },
        { name: "Rinki Pathak", role: "Event Executive", team: "AIML_EVENTS", type: "student", email: "rinki.pathak@example.com", active: true },
        // Discipline
        { name: "Prince Kumar", role: "Discipline Lead", team: "AIML_DISCIPLINE", type: "student", email: "prince.kumar@example.com", active: true },
        { name: "Nikhil Singh", role: "Discipline Executive", team: "AIML_DISCIPLINE", type: "student", email: "nikhil.singh@example.com", active: true },
        { name: "Himanshu Gour", role: "Discipline Executive", team: "AIML_DISCIPLINE", type: "student", email: "himanshu.gour@example.com", active: true },
        { name: "Sarthak Shrivastava", role: "Discipline Executive", team: "AIML_DISCIPLINE", type: "student", email: "sarthak.shri@example.com", active: true },
        // Tech
        { name: "Kinshuk Verma", role: "Technical Lead", team: "AIML_TECH", type: "student", email: "kinshuk.verma@example.com", active: true },
        { name: "Nimisha Kumari", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "nimisha.kumari@example.com", active: true },
        { name: "Arnav Singh", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "arnav.singh@example.com", active: true },
        { name: "Himanshu Singh", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "himanshu.singh@example.com", active: true },
        { name: "Jitesh", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "jitesh@example.com", active: true },
        // Anchors
        { name: "Heer Murjani", role: "Anchor Lead", team: "AIML_ANCHORS", type: "student", email: "heer.murjani@example.com", active: true },
        { name: "Anshul Sharma", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "anshul.sharma@example.com", active: true },
        { name: "Ayush Tamrakar", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "ayush.tamrakar@example.com", active: true },
        { name: "Avni Rawat", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "avni.rawat@example.com", active: true },
        { name: "Ankit Sharma", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "ankit.sharma@example.com", active: true },
        { name: "Apurvi Aggarwal", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "apurvi.agg@example.com", active: true },
        { name: "Shambhavi", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "shambhavi@example.com", active: true },
        { name: "Manish Mehra", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "manish.mehra@example.com", active: true },
        // Media/Graphics
        { name: "Prakhar Sahu", role: "Media Lead", team: "AIML_MEDIA", type: "student", email: "prakhar.sahu@example.com", active: true },
        { name: "Khushi Kumari", role: "Media Executive", team: "AIML_MEDIA", type: "student", email: "khushi.kumari@example.com", active: true },
        { name: "Anushka Malviya", role: "Media Executive", team: "AIML_MEDIA", type: "student", email: "anushka.malviya@example.com", active: true },
        { name: "Aashu Kumar", role: "Media Executive", team: "AIML_MEDIA", type: "student", email: "aashu.kumar@example.com", active: true },
        { name: "Daksh Sahni", role: "Graphics Lead", team: "AIML_MEDIA", type: "student", email: "daksh.sahni@example.com", active: true },
        { name: "Pritish Mandal", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "pritish.mandal@example.com", active: true },
        { name: "Abhijeet Sarkar", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "abhijeet.sarkar@example.com", active: true },
        { name: "Hana Nafees Abbasi", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "hana.nafees@example.com", active: true },
        { name: "Mohammed Arif Zaidi", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "arif.zaidi@example.com", active: true },
        // Editors
        { name: "Rajeev Kumar", role: "Editing Lead", team: "AIML_TECH", type: "student", email: "rajeev.kumar@example.com", active: true },
        { name: "Aditya Rajput", role: "Editor", team: "AIML_TECH", type: "student", email: "aditya.rajput@example.com", active: true },
        { name: "Prince Khatik", role: "Editor", team: "AIML_TECH", type: "student", email: "prince.khatik@example.com", active: true },
        { name: "Teena Nandanwar", role: "Editor", team: "AIML_TECH", type: "student", email: "teena.nandanwar@example.com", active: true },
    ];

    console.log(`🚀 Injecting ${members.length} Members...`);
    for (const m of members) {
        try {
            await databases.createDocument(DB_ID, COLLS.members, ID.unique(), { ...m, ...memberDefaults });
            process.stdout.write(`+`);
        } catch (e) {
            console.error(`❌ Member Error ${m.name}: ${e.message}`);
        }
    }
    console.log(`\n✅ Members Synced.`);

    // 5. Inject 11 Official Links
    const links = [
        { key: 'website', title: 'Official Website', url: 'https://aimlclub.tech', category: 'core', visibility: 'public', order: 1 },
        { key: 'blog', title: 'Knowledge Base', url: 'https://aimlclub.tech/blog', category: 'core', visibility: 'public', order: 2 },
        { key: 'contact', title: 'Governance Contact', url: 'https://aimlclub.tech/contact', category: 'core', visibility: 'public', order: 3 },
        { key: 'suggestions', title: 'SOP Suggestions', url: 'https://aimlclub.tech/suggestions', category: 'core', visibility: 'public', order: 4 },
        { key: 'media-drive', title: 'Institutional Drive', url: 'https://aimlclub.tech/resources/media-drive', category: 'resources', visibility: 'restricted', order: 5 },

        { key: 'linkedin', title: 'LinkedIn Network', url: 'https://www.linkedin.com/company/aimlcluboct', category: 'community', visibility: 'public', order: 10 },
        { key: 'github', title: 'GitHub Registry', url: 'https://github.com/aimlcluboct', category: 'community', visibility: 'public', order: 11 },
        { key: 'instagram', title: 'Instagram Feed', url: 'https://www.instagram.com/aimlcluboct', category: 'community', visibility: 'public', order: 12 },
        { key: 'photopia', title: 'Photopia Branding', url: 'https://www.instagram.com/photopia_', category: 'subbrand', visibility: 'public', order: 13 },

        { key: 'whatsapp', title: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029VbAthv38V0tfulumuV1D', category: 'community', visibility: 'public', order: 20 },
        { key: 'commudle', title: 'Commudle Hub', url: 'https://www.commudle.com/communities/ai-ml-club', category: 'community', visibility: 'public', order: 21 },
    ];

    console.log(`🚀 Injecting ${links.length} Official Links...`);
    for (const l of links) {
        try {
            await databases.createDocument(DB_ID, COLLS.links, ID.unique(), { ...l, active: true });
            process.stdout.write(`+`);
        } catch (e) {
            console.error(`❌ Link Error ${l.key}: ${e.message}`);
        }
    }
    console.log(`\n🎉 MASTER GOVERNANCE CONFIGURATION COMPLETE.`);
}

masterSeed();
