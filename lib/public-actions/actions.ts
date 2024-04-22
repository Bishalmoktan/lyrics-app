'use server';

import { Artist, Genre, Song, User } from '@prisma/client';
import { db } from '../db';
import { auth } from '@/auth';

interface songTileProps extends Song {
  Artist: Artist;
}

/**
 * Server action to get all the songs
 * @returns {songTileProps[]}
 */
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
  genres: Genre[];
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
        genres: true,
      },
    });
    return res as ISongDetail;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting the song');
  }
};

/**
 * A server action to post comments
 */
interface IPostComment {
  content: string;
  songId: string;
  userId: string;
}
export const postComment = async (data: IPostComment) => {
  const { content, songId, userId } = data;
  try {
    const session = await auth();
    if (!session) {
      throw new Error('You must be logged in to post comments');
    }
    await db.comment.create({
      data: {
        content,
        songId,
        userId,
      },
    });
    return {
      msg: 'Successfully posted your thoughts!',
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action to get all the comments
 * @returns {Comment}
 */
export interface IComment {
  id: string;
  content: string;
  createdAt: Date;
  user: User;
}
export const getAllComments = async (songId: string) => {
  try {
    const res = await db.comment.findMany({
      where: {
        songId,
      },
      include: {
        user: true,
      },
    });
    return res as IComment[];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action to delete the comment
 */
export const deleteComment = async (id: string, userId: string) => {
  try {
    const session = await auth();
    const comment = await db.comment.findUnique({
      where: {
        id,
      },
    });
    if (!comment) {
      throw new Error('Comment ID missing');
    }
    if (session?.user.id !== userId) {
      throw new Error('You cannot perform this action');
    }
    await db.comment.delete({
      where: {
        id,
      },
    });
    return {
      msg: 'Comment deleted successfully!',
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
