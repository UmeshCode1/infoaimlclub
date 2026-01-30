import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/server-appwrite"; // We need to export this or recreate it, let's use the Query approach
import { Client, Databases, Query } from "node-appwrite";

const createClient = () => {
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

export async function GET(request, { params }) {
    const slug = (await params).slug;

    try {
        const { databases } = createClient();
        const response = await databases.listDocuments(
            "main",
            "community_links",
            [Query.equal("key", slug), Query.limit(1)]
        );

        if (response.documents.length > 0) {
            const targetUrl = response.documents[0].url;
            return redirect(targetUrl);
        }

        // Fallback to homepage if not found
        return redirect('/');
    } catch (error) {
        console.error("Redirect Error:", error);
        return redirect('/');
    }
}
