import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/server-appwrite";
import { Query } from "node-appwrite";

export async function GET(request, { params }) {
    const slug = (await params).slug;

    try {
        const { databases } = createAdminClient();
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
