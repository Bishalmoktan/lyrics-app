'use client';

import { Song } from '@/app/(admin)/admin/songs/columns';
import React, { createContext, useState } from 'react';

type modalType = 'createGenre' | 'deleteSong' | null;
type modalDataType = {
  song?: Song;
};

export type ModalContextType = {
  data: modalDataType;
  type: modalType;
  isOpen: boolean;
  openModal: (type: modalType, data?: modalDataType) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<modalDataType>({});
  const [type, setType] = useState<modalType | null>(null);

  const openModal = (type: modalType, data?: modalDataType) => {
    if (data) {
      setData(data);
    }
    setType(type);
    console.log(type);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        closeModal,
        openModal,
        isOpen,
        data,
        type,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
