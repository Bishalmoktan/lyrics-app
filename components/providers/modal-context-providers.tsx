"use client";

import { IArtist } from "@/app/(admin)/admin/artists/columns";
import { Song } from "@/app/(admin)/admin/songs/columns";
import { IUser } from "@/app/(admin)/admin/users/columns";
import { Playlist } from "@prisma/client";
import React, { createContext, useState } from "react";

type modalType =
  | "deleteSong"
  | "deleteArtist"
  | "deleteUser"
  | "updateUser"
  | "toggleFeatureSong"
  | "toggleFeatureArtist"
  | "createPlaylist"
  | "deletePlaylist"
  | "renamePlaylist"
  | null;

type modalDataType = {
  song?: Song;
  artist?: IArtist;
  user?: IUser;
  playlist?: Playlist;
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
