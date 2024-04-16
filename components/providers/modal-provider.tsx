'use client';

import { useEffect, useState } from 'react';
import CreateGenreModal from '@/components/modals/create-genre-modal';
import DeleteSongModal from '@/components/modals/delete-song-modal';

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <CreateGenreModal />
      <DeleteSongModal />
    </>
  );
};
