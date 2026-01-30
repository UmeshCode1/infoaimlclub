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

async function masterSeed() {
    console.log('🚀 Initiating Deep Production Seed [Exhaustive Mode]...');

    // 1. Core Infrastructure setup
    for (const teamId of TEAM_IDS) {
        try { await teams.create(teamId, teamId); console.log(`✅ Team: ${teamId}`); } catch (e) { if (e.code !== 409) console.error(`⚠️ ${teamId}: ${e.message}`); }
    }

    try {
        await storage.createBucket('resources', 'Project Resources', [
            Permission.read(Role.any()),
            Permission.write(Role.team('AIML_ADMIN')),
            Permission.write(Role.team('AIML_FACULTY'))
        ], false, true, true, ['jpg', 'png', 'svg', 'pdf', 'doc', 'docx', 'ppt', 'pptx']);
        console.log('✅ Resources Bucket Verified');
    } catch (e) { if (e.code !== 409) console.error(e.message); }

    // 2. Exhaustive Member Council (Exact 43)
    const members = [
        // Faculty
        { name: "Prof. Shamaila Khan", role: "Faculty Coordinator", team: "AIML_FACULTY", type: "faculty", email: "shamaila.khan@oriental.ac.in", active: true },

        // Core
        { name: "Vishal Kumar", role: "President", team: "AIML_CORE", type: "student", email: "vishal.kumar@example.com", active: true },
        { name: "Umesh Patel", role: "Vice President", team: "AIML_CORE", type: "student", email: "umesh.code1@gmail.com", active: true },

        // Events Team
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

        // Discipline Team
        { name: "Prince Kumar", role: "Discipline Lead", team: "AIML_DISCIPLINE", type: "student", email: "prince.kumar@example.com", active: true },
        { name: "Nikhil Singh", role: "Discipline Executive", team: "AIML_DISCIPLINE", type: "student", email: "nikhil.singh@example.com", active: true },
        { name: "Himanshu Gour", role: "Discipline Executive", team: "AIML_DISCIPLINE", type: "student", email: "himanshu.gour@example.com", active: true },
        { name: "Sarthak Shrivastava", role: "Discipline Executive", team: "AIML_DISCIPLINE", type: "student", email: "sarthak.shri@example.com", active: true },

        // Technical Team
        { name: "Kinshuk Verma", role: "Technical Lead", team: "AIML_TECH", type: "student", email: "kinshuk.verma@example.com", active: true },
        { name: "Nimisha Kumari", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "nimisha.kumari@example.com", active: true },
        { name: "Arnav Singh", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "arnav.singh@example.com", active: true },
        { name: "Himanshu Singh", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "himanshu.singh@example.com", active: true },
        { name: "Jitesh", role: "Technical Executive", team: "AIML_TECH", type: "student", email: "jitesh@example.com", active: true },

        // Anchors Team
        { name: "Heer Murjani", role: "Anchor Lead", team: "AIML_ANCHORS", type: "student", email: "heer.murjani@example.com", active: true },
        { name: "Anshul Sharma", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "anshul.sharma@example.com", active: true },
        { name: "Ayush Tamrakar", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "ayush.tamrakar@example.com", active: true },
        { name: "Avni Rawat", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "avni.rawat@example.com", active: true },
        { name: "Ankit Sharma", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "ankit.sharma@example.com", active: true },
        { name: "Apurvi Aggarwal", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "apurvi.agg@example.com", active: true },
        { name: "Shambhavi", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "shambhavi@example.com", active: true },
        { name: "Manish Mehra", role: "Anchor Executive", team: "AIML_ANCHORS", type: "student", email: "manish.mehra@example.com", active: true },

        // Media & Photopia Team
        { name: "Prakhar Sahu", role: "Media Lead", team: "AIML_MEDIA", type: "student", email: "prakhar.sahu@example.com", active: true },
        { name: "Khushi Kumari", role: "Media Executive", team: "AIML_MEDIA", type: "student", email: "khushi.kumari@example.com", active: true },
        { name: "Anushka Malviya", role: "Media Executive", team: "AIML_MEDIA", type: "student", email: "anushka.malviya@example.com", active: true },
        { name: "Aashu Kumar", role: "Media Executive", team: "AIML_MEDIA", type: "student", email: "aashu.kumar@example.com", active: true },

        // Graphics Team
        { name: "Daksh Sahni", role: "Graphics Lead", team: "AIML_MEDIA", type: "student", email: "daksh.sahni@example.com", active: true },
        { name: "Pritish Mandal", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "pritish.mandal@example.com", active: true },
        { name: "Abhijeet Sarkar", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "abhijeet.sarkar@example.com", active: true },
        { name: "Hana Nafees Abbasi", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "hana.nafees@example.com", active: true },
        { name: "Mohammed Arif Zaidi", role: "Graphics Executive", team: "AIML_MEDIA", type: "student", email: "arif.zaidi@example.com", active: true },

        // Editors Team
        { name: "Rajeev Kumar", role: "Editing Lead", team: "AIML_TECH", type: "student", email: "rajeev.kumar@example.com", active: true },
        { name: "Aditya Rajput", role: "Editor", team: "AIML_TECH", type: "student", email: "aditya.rajput@example.com", active: true },
        { name: "Prince Khatik", role: "Editor", team: "AIML_TECH", type: "student", email: "prince.khatik@example.com", active: true },
        { name: "Teena Nandanwar", role: "Editor", team: "AIML_TECH", type: "student", email: "teena.nandanwar@example.com", active: true },
    ];

    console.log(`🚀 Injecting ${members.length} Governance Officers...`);
    for (const m of members) {
        try {
            await databases.createDocument(DB_ID, COLLS.members, ID.unique(), m);
            console.log(`✅ ${m.name}`);
        } catch (e) { console.error(`❌ ${m.name}: ${e.message}`); }
    }

    // 3. Core Community Ecosystem Links
    const links = [
        { key: 'website', title: 'Official Website', url: 'https://www.aimlclub.tech', category: 'core', visibility: 'public', order: 1 },
        { key: 'blog', title: 'Knowledge Base', url: 'https://blog.aimlclub.tech', category: 'core', visibility: 'public', order: 2 },
        { key: 'contact', title: 'Governance Contact', url: 'mailto:aimlclub@oriental.ac.in', category: 'core', visibility: 'public', order: 3 },
        { key: 'suggestions', title: 'SOP Suggestions', url: 'https://tally.so/r/n0D6m0', category: 'core', visibility: 'public', order: 4 },
        { key: 'media-drive', title: 'Institutional Drive', url: 'https://drive.google.com/drive/folders/aiml', category: 'resources', visibility: 'public', order: 5 },

        { key: 'linkedin', title: 'LinkedIn Network', url: 'https://www.linkedin.com/company/aimlclub-oct', category: 'community', visibility: 'public', order: 10 },
        { key: 'github', title: 'GitHub Registry', url: 'https://github.com/aimlclub-oct', category: 'community', visibility: 'public', order: 11 },
        { key: 'instagram', title: 'Instagram Feed', url: 'https://www.instagram.com/aimlclub.oct', category: 'community', visibility: 'public', order: 12 },
        { key: 'photopia', title: 'Photopia Branding', url: 'https://www.instagram.com/photopia.aiml', category: 'subbrand', visibility: 'public', order: 13 },

        { key: 'whatsapp', title: 'WhatsApp Channel', url: 'https://whatsapp.com/channel/0029Va9l2XzH5JM3SjBf9U1x', category: 'community', visibility: 'public', order: 20 },
        { key: 'commudle', title: 'Commudle Hub', url: 'https://www.commudle.com/communities/aimlclub-oct', category: 'community', visibility: 'public', order: 21 },
    ];

    for (const l of links) {
        try {
            await databases.createDocument(DB_ID, COLLS.links, ID.unique(), { ...l, active: true });
            console.log(`✅ Uplink: ${l.title}`);
        } catch (e) { console.error(`❌ ${l.title}: ${e.message}`); }
    }

    console.log('🎉 System Perfectly Seeded.');
}

masterSeed();
