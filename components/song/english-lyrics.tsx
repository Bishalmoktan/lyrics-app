import { ILyricsJson } from '@/app/(admin)/admin/songs/create/_components/form';
import { useCurrentLine } from '@/hooks/use-current-line';
import { useGlobalApp } from '@/hooks/use-global-app';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';

const EnglishLyrics = ({ lyrics }: { lyrics: ILyricsJson[] }) => {
  const currentLineRef = useRef<HTMLParagraphElement | null>(null);
  const { timestamp } = useGlobalApp();
  const { currentLine } = useCurrentLine(timestamp, lyrics);

  useEffect(() => {
    if(currentLineRef.current){
      currentLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [timestamp])
  return (
    <>
    {lyrics.map((line, index) => {
      const isCurrentLine = currentLine?.timestamp === line.timestamp
      const isPastLine = line.timestamp < timestamp
      return <div key={index}>{line.text === '<br>' ? <p>{'♫'}</p> : <p 
      ref={isCurrentLine ? currentLineRef : null}
      className={clsx(isCurrentLine ? 'text-white' : isPastLine ? 'text-gray-400': 'text-gray-700')}>{line.text}</p>}</div>
})}
    </>
    // <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lyrics) }}></div>
  );
};
export default EnglishLyrics;
