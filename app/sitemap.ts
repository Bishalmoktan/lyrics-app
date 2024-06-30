import { getAllSongs } from "@/lib/admin/actions";
import { MetadataRoute } from "next";

export default async function sitemap() : Promise<MetadataRoute.Sitemap> {

    const songs = await getAllSongs();
    const songsEntries : MetadataRoute.Sitemap = songs.map(({id}) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/songs/${id}`
    }))
    
    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
            lastModified: new Date()
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
            lastModified: new Date()
        },
        ...songsEntries
    ]
}