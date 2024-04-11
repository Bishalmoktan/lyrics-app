'use server';

import { db } from '@/lib/db';

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
