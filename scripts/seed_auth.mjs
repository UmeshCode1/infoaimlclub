import { Client, Users, ID, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const users = new Users(client);

const admins = [
    { email: 'umesh.code1@gmail.com', password: 'password123', name: 'Umesh Patel' },
    { email: 'vg8904937@gmail.com', password: 'password123', name: 'Vishal Kumar' },
    { email: 'shamailakhan@oriental.ac.in', password: 'password123', name: 'Prof. Shamaila Khan' }
];

async function seedAuth() {
    console.log('🚀 Seeding Admin Users...');

    for (const admin of admins) {
        try {
            // Check if exists using Query
            const list = await users.list([Query.equal("email", admin.email)]);

            if (list.total > 0) {
                console.log(`ℹ️ User already exists: ${admin.email}`);
                // Verify email automatically for convenience
                if (!list.users[0].emailVerification) {
                    await users.updateEmailVerification(list.users[0].$id, true);
                    console.log(`   - Verified email for ${admin.name}`);
                }
            } else {
                const user = await users.create(ID.unique(), admin.email, null, admin.password, admin.name);
                console.log(`✅ Created User: ${admin.email}`);
                await users.updateEmailVerification(user.$id, true);
            }
        } catch (e) {
            console.error(`❌ Error processing ${admin.email}:`, e.message);
        }
    }
}

seedAuth();
