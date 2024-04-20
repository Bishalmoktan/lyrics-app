import DOMPurify from 'isomorphic-dompurify';

const EnglishLyrics = ({ lyrics }: { lyrics: string }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lyrics) }}></div>
  );
};
export default EnglishLyrics;
