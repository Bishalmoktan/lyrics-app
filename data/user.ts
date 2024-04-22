'use server';

import { db } from '@/lib/db';

/**
 * A server action that return the current by id
 * Takes id as a parameter @type {string}
 */
export const getUserById = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};
