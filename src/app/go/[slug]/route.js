import { redirect } from 'next/navigation';
import { Client, Databases, Query } from "node-appwrite";

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
    const slug = (await params).slug;

    if (!slug) {
        return redirect('/');
    }

    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
            .setKey(process.env.APPWRITE_API_KEY);

        const databases = new Databases(client);

        const response = await databases.listDocuments(
            "main",
            "community_links",
            [
                Query.equal("key", slug),
                Query.limit(1)
            ]
        );

        if (response.documents.length > 0) {
            const targetUrl = response.documents[0].url;
            return redirect(targetUrl);
        }

        // Fallback if not found
        console.warn(`Redirect key not found: ${slug}`);
        return redirect('/');

    } catch (error) {
        console.error("Redirect error:", error);
        return redirect('/');
    }
}
