'use server';

import { Artist, Genre, Song, User } from '@prisma/client';
import { db } from '../db';

interface songTileProps extends Song {
  Artist: Artist;
}
export const getAllSongs = async () => {
  try {
    const res = await db.song.findMany({
      include: {
        Artist: true,
      },
    });
    return res as songTileProps[];
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the songs');
  }
};

/**
 * A server action that returns all the songs
 * Takes id as a parameter @type {string}
 */
export interface ISongDetail extends Song {
  Artist: Artist;
  User: User;
  Genre: Genre[];
}
export const getSongDetail = async (id: string) => {
  try {
    const res = await db.song.findUnique({
      where: {
        id,
      },
      include: {
        Artist: true,
        User: true,
        Genre: true,
      },
    });
    return res as ISongDetail;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the song');
  }
};
