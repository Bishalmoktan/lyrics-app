'use client';

import { useState } from 'react';

interface ReadMoreProps {
  id: string;
  text: string;
  amountOfWords?: number;
}

export const ReadMore = ({ id, text, amountOfWords = 36 }: ReadMoreProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const splittedText = text.split(' ');
  const itCanOverflow = splittedText.length > amountOfWords;
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text;
  const endText = splittedText.slice(amountOfWords - 1).join(' ');

  if (text === '') {
    return <p>We will soon add the story of this song.</p>;
  }

  return (
    <p id={id}>
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>... </span>}
          <span
            className={`${!isExpanded && 'hidden'}`}
            aria-hidden={!isExpanded}
          >
            {endText}
          </span>
          <span
            className="text-zinc-400 ml-2"
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'show less' : 'read more'}
          </span>
        </>
      )}
    </p>
  );
};
