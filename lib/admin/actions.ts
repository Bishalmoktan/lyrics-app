'use server';

import { formSchema } from '@/app/(admin)/admin/songs/create/_components/form';
import { formSchema as artistFormSchema } from '@/app/(admin)/admin/artists/_components/form';
import { z } from 'zod';
import { db } from '../db';
import { auth } from '@/auth';
import { Song } from '@/app/(admin)/admin/songs/columns';

type postSongData = z.infer<typeof formSchema>;

interface IPostSongData extends postSongData {
  thumbnail: string;
  id?: string;
  userId?: string;
}

/**
 * A server action to post a new lyrics of a song
 * Takes a song data as parameter
 * @type {IPostSongData[]}
 */
export const postSong = async (data: IPostSongData) => {
  const {
    artist,
    genre,
    songId,
    lyrics,
    story,
    thumbnail,
    title,
    nepaliLyrics,
    duration,
  } = data;
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }
    const song = await db.song.findFirst({
      where: {
        title: title,
        artistId: artist,
      },
    });

    if (song) {
      throw new Error('Song with the title and the artist already exists');
    }

    await db.song.create({
      data: {
        lyrics,
        artistId: artist,
        songId,
        thumbnail,
        title,
        userId: session.user.id!,
        story,
        nepaliLyrics,
        duration,
        genres: {
          connect: genre.map((name) => ({ name })),
        },
      },
    });

    return {
      msg: 'Song added successfully!',
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/**
 * A server action to update a new lyrics of a song
 * Takes a song data as parameter
 * @type {IPostSongData[]}
 */
export const updateSong = async (data: IPostSongData) => {
  const { artist, genre, songId, lyrics, story, thumbnail, title, id, userId } =
    data;
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Unauthorized');
    }

    if (!userId || userId === '') {
      throw new Error('User id missing');
    }

    await db.song.update({
      where: {
        id: id,
      },
      data: {
        lyrics,
        artistId: artist,
        songId,
        thumbnail,
        title,
        userId,
        story,
        genres: {
          set: genre.map((name) => ({ name })),
        },
      },
    });

    return {
      msg: 'Song updated successfully!',
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
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
    const artist = await db.artist.findFirst({
      where: {
        name: data.name,
      },
    });
    if (artist) {
      throw new Error('Artist already exits!');
    }
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
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export interface ICreateGenre {
  name: string;
  image: string;
  background: string;
}

/**
 * A server actions to create a new genre
 * Takes an genre name as parameter
 * @type {string}
 */
export const createGenre = async (data: ICreateGenre) => {
  try {
    const { background, name, image } = data;
    const genre = await db.genre.findUnique({
      where: {
        name,
      },
    });
    if (genre) {
      throw new Error('Genre already exists');
    }
    await db.genre.create({
      data: {
        name,
        backgroundColor: background,
        image,
      },
    });
    return {
      msg: 'Genre created successfully!',
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
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
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action that returns all the artists
 * Doesn't take any parameter
 */
export const getArtistById = async (id: string) => {
  try {
    const res = await db.artist.findUnique({
      where: {
        id,
      },
    });
    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export interface IUpdatedArtist {
  name: string;
  avatar_url: string;
  designation: string;
}

/**
 * Updates Artist
 * @param data @type {IArtist}
 * @returns @type {string}
 */
export const updateArtist = async (
  artistId: string,
  updatedData: IUpdatedArtist
) => {
  const { avatar_url, designation, name } = updatedData;
  try {
    const session = await getCurrentUser();
    if (session?.user.role === 'USER') {
      throw new Error('You cannot perform this action');
    }

    const artist = await db.artist.update({
      where: {
        id: artistId,
      },
      data: {
        avatar_url,
        designation,
        name,
      },
    });
    return {
      msg: `${artist.name} is successfully updated`,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action that returns all the genre
 * Doesn't take any parameter
 */
export const getAllGenre = async () => {
  try {
    const res = await db.genre.findMany({});
    return res;
  } catch (error: any) {
    throw new Error(error.message);
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

/**
 * A server action that returns all the songs
 * Doesn't take any parameter
 */
export const getAllSongs = async () => {
  try {
    const res = await db.song.findMany({
      select: {
        id: true,
        Artist: true,
        title: true,
        User: true,
        isFeatured: true,
      },
    });
    return res as Song[];
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the songs');
  }
};
/**
 * A server action that returns all the songs
 * Takes id as a parameter @type {string}
 */
export const getSongDetail = async (id: string) => {
  try {
    const res = await db.song.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        Artist: true,
        title: true,
        User: true,
        genres: true,
        lyrics: true,
        story: true,
        songId: true,
        thumbnail: true,
        userId: true,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the song');
  }
};

/**
 * Get current User
 * @returns {Session | null}
 */
export const getCurrentUser = async () => {
  const session = await auth();
  return session;
};
