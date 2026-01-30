import { Client, Databases, Teams, Storage, ID, Permission, Role, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("697bdf630039dcd6007e")
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

async function masterSeed() {
    console.log('🏗️ Starting Master Governance Seed [Phase 1: Infra]...');

    // 1. Setup Teams
    for (const teamId of TEAM_IDS) {
        try { await teams.create(teamId, teamId); console.log(`✅ Team Created: ${teamId}`); } catch (e) { if (e.code !== 409) console.error(e.message); }
    }

    // 2. Setup Storage
    try {
        await storage.createBucket('resources', 'Project Resources', [
            Permission.read(Role.any()),
            Permission.write(Role.team('AIML_ADMIN'))
        ], false, true, true, ['jpg', 'png', 'svg', 'pdf', 'doc', 'docx', 'ppt', 'pptx']);
        console.log('✅ Storage Bucket Initialized');
    } catch (e) { if (e.code !== 409) console.error(e.message); }

    // 3. Seed 43 Members
    const members = [
        { name: "Prof. Shamaila Khan", role: "Faculty Coordinator", team: "AIML_FACULTY", type: "faculty", email: "shamaila.khan@oriental.ac.in", active: true },
        { name: "Vishal Kumar", role: "President", team: "AIML_CORE", type: "student", email: "vishal.aiml@example.com", active: true },
        { name: "Umesh Patel", role: "Vice President", team: "AIML_CORE", type: "student", email: "umesh.code1@gmail.com", active: true },
        { name: "Gourav Jain", role: "Event Lead", team: "AIML_EVENTS", type: "student", email: "gourav@example.com", active: true },
        { name: "Aarchi Sharma", role: "Event Coordinator", team: "AIML_EVENTS", type: "student", email: "aarchi@example.com", active: true },
        { name: "Parul Ajit", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "parul@example.com", active: true },
        { name: "Anjali Sonare", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "anjali@example.com", active: true },
        { name: "Aanya Tomar", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "aanya@example.com", active: true },
        { name: "Bhavesh Singh", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "bhavesh@example.com", active: true },
        { name: "Tanu Jadon", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "tanu@example.com", active: true },
        { name: "Sarvesh Sejwar", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "sarvesh@example.com", active: true },
        { name: "Nasir Khan", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "nasir@example.com", active: true },
        { name: "Rinki Pathak", role: "Event Team", team: "AIML_EVENTS", type: "student", email: "rinki@example.com", active: true },
        { name: "Prince Kumar", role: "Discipline Lead", team: "AIML_DISCIPLINE", type: "student", email: "prince@example.com", active: true },
        { name: "Nikhil Singh", role: "Discipline Team", team: "AIML_DISCIPLINE", type: "student", email: "nikhil@example.com", active: true },
        { name: "Himanshu Gour", role: "Discipline Team", team: "AIML_DISCIPLINE", type: "student", email: "gour@example.com", active: true },
        { name: "Sarthak Shrivastava", role: "Discipline Team", team: "AIML_DISCIPLINE", type: "student", email: "sarthak@example.com", active: true },
        { name: "Kinshuk Verma", role: "Tech Lead", team: "AIML_TECH", type: "student", email: "kinshuk@example.com", active: true },
        { name: "Nimisha Kumari", role: "Tech Team", team: "AIML_TECH", type: "student", email: "nimisha@example.com", active: true },
        { name: "Arnav Singh", role: "Tech Team", team: "AIML_TECH", type: "student", email: "arnav@example.com", active: true },
        { name: "Himanshu Singh", role: "Tech Team", team: "AIML_TECH", type: "student", email: "himanshu@example.com", active: true },
        { name: "Jitesh", role: "Tech Team", team: "AIML_TECH", type: "student", email: "jitesh@example.com", active: true },
        { name: "Heer Murjani", role: "Anchor Lead", team: "AIML_ANCHORS", type: "student", email: "heer@example.com", active: true },
        { name: "Anshul Sharma", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "anshul@example.com", active: true },
        { name: "Ayush Tamrakar", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "ayush@example.com", active: true },
        { name: "Avni Rawat", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "avni@example.com", active: true },
        { name: "Ankit Sharma", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "ankit@example.com", active: true },
        { name: "Apurvi Aggarwal", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "apurvi@example.com", active: true },
        { name: "Shambhavi", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "shamba@example.com", active: true },
        { name: "Manish Mehra", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "manish@example.com", active: true },
        { name: "Prakhar Sahu", role: "Media Lead", team: "AIML_MEDIA", type: "student", email: "prakhar@example.com", active: true },
        { name: "Khushi Kumari", role: "Media Team", team: "AIML_MEDIA", type: "student", email: "khushi@example.com", active: true },
        { name: "Anushka Malviya", role: "Media Team", team: "AIML_MEDIA", type: "student", email: "anushka@example.com", active: true },
        { name: "Aashu Kumar", role: "Media Team", team: "AIML_MEDIA", type: "student", email: "aashu@example.com", active: true },
        { name: "Daksh Sahni", role: "Graphics Lead", team: "AIML_MEDIA", type: "student", email: "daksh@example.com", active: true },
        { name: "Pritish Mandal", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "pritish@example.com", active: true },
        { name: "Abhijeet Sarkar", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "abhijeet@example.com", active: true },
        { name: "Hana Nafees Abbasi", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "hana@example.com", active: true },
        { name: "Mohammed Arif Zaidi", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "arif@example.com", active: true },
        { name: "Rajeev Kumar", role: "Editing Lead", team: "AIML_TECH", type: "student", email: "rajeev@example.com", active: true },
        { name: "Aditya Rajput", role: "Editor", team: "AIML_TECH", type: "student", email: "aditya@example.com", active: true },
        { name: "Prince Khatik", role: "Editor", team: "AIML_TECH", type: "student", email: "khatik@example.com", active: true },
        { name: "Teena Nandanwar", role: "Editor", team: "AIML_TECH", type: "student", email: "teena@example.com", active: true },
    ];

    console.log('🌱 Phase 2: Members & Links...');
    for (const m of members) {
        try {
            const existing = await databases.listDocuments(DB_ID, COLLS.members, [Query.equal('email', m.email)]);
            if (existing.total === 0) {
                await databases.createDocument(DB_ID, COLLS.members, ID.unique(), m);
                console.log(`✅ Member Seeded: ${m.name}`);
            }
        } catch (e) { console.error(e.message); }
    }

    const links = [
        { key: 'website', title: 'Official Website', url: 'https://www.aimlclub.tech', category: 'core', visibility: 'public', order: 1 },
        { key: 'blog', title: 'Technical Blog', url: 'https://blog.aimlclub.tech', category: 'core', visibility: 'public', order: 2 },
        { key: 'contact', title: 'Official Contact', url: 'mailto:aimlclub@oriental.ac.in', category: 'core', visibility: 'public', order: 3 },
        { key: 'suggestions', title: 'Suggestions Box', url: 'https://tally.so/r/n0D6m0', category: 'core', visibility: 'public', order: 4 },
        { key: 'instagram', title: 'Instagram', url: 'https://www.instagram.com/aimlclub.oct', category: 'community', visibility: 'public', order: 5 },
        { key: 'linkedin', title: 'LinkedIn', url: 'https://www.linkedin.com/company/aimlclub-oct', category: 'community', visibility: 'public', order: 6 },
        { key: 'github', title: 'GitHub', url: 'https://github.com/aimlclub-oct', category: 'community', visibility: 'public', order: 7 },
        { key: 'whatsapp', title: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029Va9l2XzH5JM3SjBf9U1x', category: 'community', visibility: 'public', order: 8 },
        { key: 'media-drive', title: 'Media Drive', url: 'https://drive.google.com/drive/folders/community', category: 'resources', visibility: 'public', order: 9 },
        { key: 'photopia', title: 'Photopia Instagram', url: 'https://www.instagram.com/photopia.aiml', category: 'subbrand', visibility: 'public', order: 10 }
    ];

    for (const l of links) {
        try {
            const existing = await databases.listDocuments(DB_ID, COLLS.links, [Query.equal('key', l.key)]);
            if (existing.total === 0) {
                await databases.createDocument(DB_ID, COLLS.links, ID.unique(), { ...l, active: true });
                console.log(`✅ Link Seeded: ${l.title}`);
            }
        } catch (e) { console.error(e.message); }
    }

    console.log('🎉 Master Seed Completed Successfully.');
}

masterSeed();
