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
    const members = [
        {
            name: "Dr. Kavita Burse",
            enrollment_no: null,
            role: "Faculty Coordinator",
            team: "AIML_FACULTY",
            email: "kavita.burse@oriental.ac.in",
            contact: null,
            type: "faculty",
            active: true
        },
        {
            name: "Umesh Patel",
            enrollment_no: "0112AI221118",
            role: "Technical Lead",
            team: "AIML_CORE",
            email: "umesh.code1@gmail.com",
            contact: "9171234567",
            type: "student",
            active: true
        }
    ];

    console.log('🌱 Seeding initial members...');
    for (const member of members) {
        try {
            await databases.createDocument(DB_ID, COLL_MEMBERS, ID.unique(), member);
            console.log(`✅ Seeded: ${member.name} (${member.role})`);
        } catch (e) {
            console.error(`❌ Failed to seed ${member.name}:`, e.message);
        }
    }
}

seed();
