import DOMPurify from 'isomorphic-dompurify';

const NepaliLyrics = ({ lyrics }: { lyrics: string }) => {
  if (lyrics !== '') {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lyrics) }}
      ></div>
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
