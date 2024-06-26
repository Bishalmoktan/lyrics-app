import { ILyricsJson } from "@/app/(admin)/admin/songs/create/_components/form";
import { useEffect, useState } from "react";

export function useCurrentLine(timestamp: number, lyrics: ILyricsJson[]){
    const [currentLine, setCurrentLine] = useState<ILyricsJson | null>(null);

    useEffect(() => {
        const nextLineIndex = lyrics.findIndex(
            (line) => line.timestamp > timestamp
        )

        if(nextLineIndex === 0){
            setCurrentLine(lyrics[0]);
            return;
        }
        if(nextLineIndex === -1){
            setCurrentLine(lyrics[lyrics.length - 1])
            return;
        }

        setCurrentLine(lyrics[nextLineIndex - 1]);
    }, [timestamp])

    return { currentLine };
}