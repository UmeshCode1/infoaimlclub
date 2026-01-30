import { getLinks, getAnnouncements, getActiveEvent, getResources } from "@/lib/server-appwrite";
import PageContent from "@/components/PageContent";

export const dynamic = 'force-dynamic';

export default async function Home() {
    const [links, announcement, event, resources] = await Promise.all([
        getLinks(),
        getAnnouncements(),
        getActiveEvent(),
        getResources()
    ]);

    return (
        <PageContent
            links={links}
            announcement={announcement}
            activeEvent={event}
            resources={resources}
        />
    );
}
