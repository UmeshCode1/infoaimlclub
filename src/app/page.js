import { getLinks, getAnnouncements } from "@/lib/server-appwrite";
import PageContent from "@/components/PageContent";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const links = await getLinks();
    const announcement = await getAnnouncements();

    return <PageContent links={links} announcement={announcement} />;
}
