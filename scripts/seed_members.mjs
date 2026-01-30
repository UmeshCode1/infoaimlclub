import { Client, Databases, ID } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("697bdf630039dcd6007e")
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DB_ID = 'main';
const COLL_MEMBERS = 'members';

async function seed() {
    console.log('🚀 Seeding 43 Mandatory Council Members...');

    const members = [
        // Faculty
        { name: "Prof. Shamaila Khan", role: "Faculty Coordinator", team: "AIML_FACULTY", type: "faculty", email: "shamaila.khan@oriental.ac.in", active: true },

        // Core
        { name: "Vishal Kumar", role: "President", team: "AIML_CORE", type: "student", email: "vishal.aiml@example.com", active: true },
        { name: "Umesh Patel", role: "Vice President", team: "AIML_CORE", type: "student", email: "umesh.code1@gmail.com", active: true },

        // Events
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

        // Discipline
        { name: "Prince Kumar", role: "Discipline Lead", team: "AIML_DISCIPLINE", type: "student", email: "prince@example.com", active: true },
        { name: "Nikhil Singh", role: "Discipline Team", team: "AIML_DISCIPLINE", type: "student", email: "nikhil@example.com", active: true },
        { name: "Himanshu Gour", role: "Discipline Team", team: "AIML_DISCIPLINE", type: "student", email: "gour@example.com", active: true },
        { name: "Sarthak Shrivastava", role: "Discipline Team", team: "AIML_DISCIPLINE", type: "student", email: "sarthak@example.com", active: true },

        // Technical
        { name: "Kinshuk Verma", role: "Tech Lead", team: "AIML_TECH", type: "student", email: "kinshuk@example.com", active: true },
        { name: "Nimisha Kumari", role: "Tech Team", team: "AIML_TECH", type: "student", email: "nimisha@example.com", active: true },
        { name: "Arnav Singh", role: "Tech Team", team: "AIML_TECH", type: "student", email: "arnav@example.com", active: true },
        { name: "Himanshu Singh", role: "Tech Team", team: "AIML_TECH", type: "student", email: "himanshu@example.com", active: true },
        { name: "Jitesh", role: "Tech Team", team: "AIML_TECH", type: "student", email: "jitesh@example.com", active: true },

        // Anchors
        { name: "Heer Murjani", role: "Anchor Lead", team: "AIML_ANCHORS", type: "student", email: "heer@example.com", active: true },
        { name: "Anshul Sharma", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "anshul@example.com", active: true },
        { name: "Ayush Tamrakar", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "ayush@example.com", active: true },
        { name: "Avni Rawat", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "avni@example.com", active: true },
        { name: "Ankit Sharma", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "ankit@example.com", active: true },
        { name: "Apurvi Aggarwal", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "apurvi@example.com", active: true },
        { name: "Shambhavi", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "shamba@example.com", active: true },
        { name: "Manish Mehra", role: "Anchor Team", team: "AIML_ANCHORS", type: "student", email: "manish@example.com", active: true },

        // Media / Photopia
        { name: "Prakhar Sahu", role: "Media Lead", team: "AIML_MEDIA", type: "student", email: "prakhar@example.com", active: true },
        { name: "Khushi Kumari", role: "Media Team", team: "AIML_MEDIA", type: "student", email: "khushi@example.com", active: true },
        { name: "Anushka Malviya", role: "Media Team", team: "AIML_MEDIA", type: "student", email: "anushka@example.com", active: true },
        { name: "Aashu Kumar", role: "Media Team", team: "AIML_MEDIA", type: "student", email: "aashu@example.com", active: true },

        // Graphics (Categorized under Media for initial DB)
        { name: "Daksh Sahni", role: "Graphics Lead", team: "AIML_MEDIA", type: "student", email: "daksh@example.com", active: true },
        { name: "Pritish Mandal", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "pritish@example.com", active: true },
        { name: "Abhijeet Sarkar", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "abhijeet@example.com", active: true },
        { name: "Hana Nafees Abbasi", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "hana@example.com", active: true },
        { name: "Mohammed Arif Zaidi", role: "Graphics Team", team: "AIML_MEDIA", type: "student", email: "arif@example.com", active: true },

        // Editors
        { name: "Rajeev Kumar", role: "Editing Lead", team: "AIML_TECH", type: "student", email: "rajeev@example.com", active: true },
        { name: "Aditya Rajput", role: "Editor", team: "AIML_TECH", type: "student", email: "aditya@example.com", active: true },
        { name: "Prince Khatik", role: "Editor", team: "AIML_TECH", type: "student", email: "khatik@example.com", active: true },
        { name: "Teena Nandanwar", role: "Editor", team: "AIML_TECH", type: "student", email: "teena@example.com", active: true },
    ];

    for (const m of members) {
        try {
            await databases.createDocument(DB_ID, COLL_MEMBERS, ID.unique(), m);
            console.log(`✅ Seeded: ${m.name} [${m.team}]`);
        } catch (e) {
            console.error(`❌ Failed: ${m.name}`, e.message);
        }
    }
}

seed();
