'use client';

import { useEffect, useState } from 'react';
import CreateGenreModal from '@/components/modals/create-genre-modal';
import DeleteSongModal from '@/components/modals/delete-song-modal';
import DeleteArtistModal from '@/components/modals/delete-artist-modal';
import DeleteUserModal from '@/components/modals/delete-user-modal';
import UpdateUserModal from '@/components/modals/update-user-modal';
import UpdateArtistModal from '../modals/update-artist-modal';

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
      <DeleteArtistModal />
      <DeleteUserModal />
      <UpdateUserModal />
      <UpdateArtistModal />
    </>
  );
};
