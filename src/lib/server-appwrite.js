import { Client, Databases, Query } from "node-appwrite";

const createAdminClient = () => {
    const client = new Client()
        .setEndpoint("https://fra.cloud.appwrite.io/v1")
        .setProject("697bdf630039dcd6007e")
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
        return [];
    }
}

export async function getAnnouncements() {
    try {
        const { databases } = createAdminClient();
        const response = await databases.listDocuments(
            "main",
            "announcements",
            [
                Query.equal("active", true),
                Query.orderDesc("starts_at"),
                Query.limit(1)
            ]
        );
        return response.documents[0] || null;
    } catch (error) {
        console.error("Error fetching announcements:", error);
        return null;
    }
}
