import { NextResponse } from 'next/server';
import { Client, Databases, Query } from 'node-appwrite';

const client = new Client()
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("697bdf630039dcd6007e")
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const CACHE = new Map();
const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Handle /go/:key redirects
    if (pathname.startsWith('/go/')) {
        const key = pathname.split('/')[2];

        // Check Memory Cache
        const cached = CACHE.get(key);
        if (cached && (Date.now() - cached.time < CACHE_TTL)) {
            return NextResponse.redirect(new URL(cached.url));
        }

        try {
            const response = await databases.listDocuments(
                'main',
                'community_links',
                [Query.equal('key', key), Query.equal('active', true), Query.limit(1)]
            );

            if (response.documents.length > 0) {
                const target = response.documents[0].url;
                CACHE.set(key, { url: target, time: Date.now() });
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
