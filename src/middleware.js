import { NextResponse } from 'next/server';
import { Client, Databases, Query } from 'node-appwrite';

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("697bdf630039dcd6007e")
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Handle /go/:key redirects
    if (pathname.startsWith('/go/')) {
        const key = pathname.split('/')[2];

        try {
            const response = await databases.listDocuments(
                'main',
                'community_links',
                [Query.equal('key', key), Query.equal('active', true), Query.limit(1)]
            );

            if (response.documents.length > 0) {
                const target = response.documents[0].url;
                return NextResponse.redirect(new URL(target));
            }
        } catch (error) {
            console.error('Middleware Redirect Error:', error);
        }

        // Fallback to home if not found
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/go/:key*'],
};
