"use client"
import { ILyricsJson } from '@/app/(admin)/admin/songs/create/_components/form';
import { useCurrentLine } from '@/hooks/use-current-line';
import { useGlobalApp } from '@/hooks/use-global-app';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface NepaliLyricsProps {
  lyrics: ILyricsJson[];
  syncLyrics: boolean;
}

const NepaliLyrics = ({ lyrics, syncLyrics }: NepaliLyricsProps) => {
  const currentLineRef = useRef<HTMLParagraphElement | null>(null);
  const { timestamp } = useGlobalApp();
  const { currentLine } = useCurrentLine(timestamp, lyrics);

  useEffect(() => {
    if (currentLineRef.current) {
      currentLineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [timestamp]);
  if (lyrics.length) {
    return (
      <>
      {syncLyrics ? lyrics.map((line, index) => {
        const isCurrentLine = currentLine?.timestamp === line.timestamp;
        const isPastLine = line.timestamp < timestamp;
        return (
          <div key={index}>
            {line.text.includes("= MUSIC =") ? (
              <p
                ref={isCurrentLine ? currentLineRef : null}
                className={clsx(
                  "my-4",
                  isCurrentLine
                    ? "text-white"
                    : isPastLine
                    ? "text-gray-400"
                    : "text-gray-700"
                )}
              >
                {"♫ ♫ ♫ Music ♫ ♫ ♫"}
              </p>
            ) : line.text.includes("= END =") ? (
              <p
                ref={isCurrentLine ? currentLineRef : null}
                className={clsx(
                  "my-4",
                  isCurrentLine
                    ? "text-white"
                    : isPastLine
                    ? "text-gray-400"
                    : "text-gray-700"
                )}
              >
                {"♫ ♫ ♫ End ♫ ♫ ♫"}
              </p>
            ) : line.text.includes("= START =") ? (
              <p
                ref={isCurrentLine ? currentLineRef : null}
                className={clsx(
                  "my-4",
                  isCurrentLine
                    ? "text-white"
                    : isPastLine
                    ? "text-gray-400"
                    : "text-gray-700"
                )}
              >
                {"♫ ♫ ♫ Intro ♫ ♫ ♫"}
              </p>
            ) : (
              <p
                ref={isCurrentLine ? currentLineRef : null}
                className={clsx(
                  isCurrentLine
                    ? "text-white"
                    : isPastLine
                    ? "text-gray-400"
                    : "text-gray-700"
                )}
              >
                {line.text}
              </p>
            )}
          </div>
        );
      }) : 
      lyrics.map((line, index) => {
        return (
          <div key={index}>
            {line.text.includes("= MUSIC =") ? (
              <p className="my-4 text-white">{"♫ ♫ ♫ Music ♫ ♫ ♫"}</p>
            ) : line.text.includes("= END =") ? (
              <p className="text-white my-4">{"♫ ♫ ♫ End ♫ ♫ ♫"}</p>
            ) : line.text.includes("= START =") ? (
              <p className="text-white my-4">{"♫ ♫ ♫ Intro ♫ ♫ ♫"}</p>
            ) : (
              <p className="text-white">{line.text}</p>
            )}
          </div>
        );
      })}
    </>
    );
  }

  return (
    <div>
      <p>अहिले नेपाली लिरिक्स उपलब्ध छैन। </p>
      <p>कृपया केहि समय पर्खनुहोस ।</p>
      <p>हामीलाई इमेल गर्नसक्नु हुन्छ। </p>
    </div>
  );
};
export default NepaliLyrics;
