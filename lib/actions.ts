'use server';

import { formSchema } from '@/app/(admin)/admin/songs/create/_components/form';
import { formSchema as artistFormSchema } from '@/app/(admin)/admin/artists/create/_components/form';
import { z } from 'zod';
import { db } from './db';

type postSongData = z.infer<typeof formSchema>;

interface IPostSongData extends postSongData {
  thumbnail: string;
}

export const postSong = async (data: IPostSongData) => {
  console.log(data);
};

type createArtistData = z.infer<typeof artistFormSchema>;

interface ICreateArtistData extends createArtistData {
  avatar: string;
}

export const createArtist = async (data: ICreateArtistData) => {
  try {
    await db.artist.create({
      data: {
        name: data.name,
        designation: data.designation,
        avatar_url: data.avatar,
      },
    });

    return {
      msg: 'Artist created successfully!',
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error creating the artist');
  }
};

export const getAllArtist = async () => {
  try {
    const res = await db.artist.findMany({
      include: {
        songs: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the artist');
  }
};
