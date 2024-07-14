'use server';

import { IArtist } from '@/app/(admin)/admin/artists/columns';
import { Song } from '@/app/(admin)/admin/songs/columns';
import { IUser } from '@/app/(admin)/admin/users/columns';
import { db } from '@/lib/db';
import { UserRole } from '@prisma/client';
import { getCurrentUser } from './actions';

/**
 * Deletes Song
 * @param data @type {Song}
 * @returns @type {string}
 */
export const deleteSong = async (data: Song) => {
  try {
    const song = await db.song.delete({
      where: {
        id: data.id,
      },
    });

    return {
      msg: `${song.title} is successfully deleted`,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Deletes Artist
 * @param data @type {IArtist}
 * @returns @type {string}
 */
export const deleteArtist = async (data: IArtist) => {
  try {
    const artist = await db.artist.delete({
      where: {
        id: data.id,
      },
    });
    return {
      msg: `${artist.name} is successfully deleted`,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Deletes Artist
 * @param data @type {IArtist}
 * @returns @type {string}
 */
export const deleteUser = async (data: IUser) => {
  try {
    const adminUser = await db.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });

    if (!adminUser) {
      throw new Error('No admin user found');
    }

    await db.song.updateMany({
      where: {
        userId: data.id,
      },
      data: {
        userId: adminUser.id,
      },
    });

    const user = await db.user.delete({
      where: {
        id: data.id,
      },
    });

    return {
      msg: `${user.name} is successfully deleted, and their songs have been transferred to the admin.`,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Updates User
 * @param data @type {IArtist}
 * @returns @type {string}
 */
export const updateUser = async (data: IUser, role: UserRole) => {
  try {
    const session = await getCurrentUser();

    if (!session) {
      throw new Error('Not authenticated');
    }

    if (session.user.role === 'USER') {
      throw new Error('You cannot perform this action');
    }

    if (data.id === session.user.id) {
      throw new Error('You cannot update yourself');
    }

    if (data.role === 'ADMIN') {
      throw new Error('You cannot update an admin.');
    }

    if (role === 'ADMIN' && session.user.role !== 'ADMIN') {
      throw new Error('You must be an admin to perform this action');
    }

    if (role === 'MODERATOR' && session.user.role === 'MODERATOR') {
      throw new Error('You must be an admin to perform this action');
    }

    const user = await db.user.update({
      where: {
        id: data.id,
      },
      data: {
        role,
      },
    });

    return {
      msg: `${user.name} is successfully updated`,
    };
  } catch (error: any) {
    console.log(error)
     throw new Error(error.message)
};
}

/**
 * Toggle feature song
 * @param data @type {Song}
 * @returns @type {string}
 */
export const toggleFeatureSong = async (data: Song) => {
  try {
    const { isFeatured } = data;
    const song = await db.song.update({
      where: {
        id: data.id,
      },
      data: {
        isFeatured: !isFeatured,
      },
    });

    return {
      msg: `${song.title} is ${
        isFeatured ? 'removed from' : 'added to'
      } the featured list!`,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Toggle feature artist
 * @param data @type {artist}
 * @returns @type {string}
 */
export const toggleFeatureArtist = async (data: IArtist) => {
  try {
    const { isFeatured } = data;
    const artist = await db.artist.update({
      where: {
        id: data.id,
      },
      data: {
        isFeatured: !isFeatured,
      },
    });

    return {
      msg: `${artist.name} is ${
        isFeatured ? 'removed from' : 'added to'
      } the featured list!`,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
