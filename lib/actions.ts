'use server';

import { formSchema } from '@/app/(admin)/admin/songs/create/_components/form';
import { formSchema as artistFormSchema } from '@/app/(admin)/admin/artists/create/_components/form';
import { z } from 'zod';
import { db } from './db';

type postSongData = z.infer<typeof formSchema>;

interface IPostSongData extends postSongData {
  thumbnail: string;
}

/**
 * A server action to post a new lyrics of a song
 * Takes a song data as parameter
 * @type {IPostSongData[]}
 */
export const postSong = async (data: IPostSongData) => {
  console.log(data);
};

type createArtistData = z.infer<typeof artistFormSchema>;

interface ICreateArtistData extends createArtistData {
  avatar: string;
}
/**
 * A server actions to create a new artist
 * Takes an artist data as parameter
 * @type {ICreateArtistData[]}
 */
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

/**
 * A server action that returns all the artists
 * Doesn't take any parameter
 */
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

/**
 * A server action that returns all the users
 * Doesn't take any parameter
 */
export const getAllUsers = async () => {
  try {
    const res = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        songs: true,
        image: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the users');
  }
};
