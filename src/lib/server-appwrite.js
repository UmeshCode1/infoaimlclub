import { Client, Databases, Query } from "node-appwrite";

export const createAdminClient = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
        .setKey(process.env.APPWRITE_API_KEY);

    return {
        get databases() {
            return new Databases(client);
        },
    };
};

export async function getLinks() {
    try {
        const { databases } = createAdminClient();
        const response = await databases.listDocuments(
            "main",
            "community_links",
            [Query.equal("active", true), Query.orderAsc("order")]
        );
        return response.documents;
    } catch (error) {
        console.error("Error fetching links:", error);
        // Return empty array instead of crashing
        return [];
    }
}

export async function getAnnouncements() {
    try {
        const { databases } = createAdminClient();
        const now = new Date().toISOString();
        const response = await databases.listDocuments(
            "main",
            "announcements",
            [
                Query.equal("active", true),
                Query.lessThanEqual("starts_at", now),
                Query.greaterThanEqual("ends_at", now),
                Query.limit(1)
            ]
        );
        return response.documents[0] || null;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return null;
    }
}

export async function getActiveEvent() {
    try {
        const { databases } = createAdminClient();
        const now = new Date().toISOString();
        const response = await databases.listDocuments(
            "main",
            "events",
            [
                Query.equal("active", true),
                Query.lessThanEqual("starts_at", now),
                Query.greaterThanEqual("ends_at", now),
                Query.limit(1)
            ]
        );
        return response.documents[0] || null;
    } catch (error) {
        console.error("Error fetching active event:", error);
        return null;
    }
}

export async function getResources() {
    try {
        const { databases } = createAdminClient();
        const response = await databases.listDocuments(
            "main",
            "resources",
            [
                Query.equal("active", true),
                Query.equal("visibility", "public"),
                Query.limit(10)
            ]
        );
        return response.documents;
    } catch (error) {
        console.error("Error fetching resources:", error);
        return [];
    }
}

