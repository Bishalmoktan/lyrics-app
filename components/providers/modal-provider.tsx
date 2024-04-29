'use client';

import { useEffect, useState } from 'react';
import DeleteSongModal from '@/components/modals/delete-song-modal';
import DeleteArtistModal from '@/components/modals/delete-artist-modal';
import DeleteUserModal from '@/components/modals/delete-user-modal';
import UpdateUserModal from '@/components/modals/update-user-modal';
import ToggleFeatureSongModal from '@/components/modals/toggle-feature-song-modal';
import ToggleFeatureArtistModal from '@/components/modals/toggle-feature-artist-modal';

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
      <DeleteSongModal />
      <DeleteArtistModal />
      <DeleteUserModal />
      <UpdateUserModal />
      <ToggleFeatureSongModal />
      <ToggleFeatureArtistModal />
    </>
  );
};
