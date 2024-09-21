"use server";

import { Artist, Genre, Song, User } from "@prisma/client";
import { db } from "../db";
import { auth } from "@/auth";
import { redis } from "@/redis/redis";
import { keys } from "@/redis/keys";
import { cacheKey, paginatedCacheKey } from "@/redis/utils";

interface songTileProps extends Song {
  Artist: Artist;
}

export interface paingatedSongs {
  songs: songTileProps[];
  totalSongs: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Server action to get all the songs
 * @returns {paingatedSongs}
 */
export const getAllSongs = async (page: number = 1, pageSize: number = 10) => {
  try {
    const skip = (page - 1) * pageSize;

    const cachedSongs = await redis.get(
      paginatedCacheKey("songs", page, pageSize)
    );

    if (cachedSongs) {
      return JSON.parse(cachedSongs) as paingatedSongs;
    }

    const res = await db.song.findMany({
      skip: skip,
      take: pageSize,
      include: {
        Artist: true,
      },
    });

    const totalSongs = await db.song.count();

    const response = {
      songs: res as songTileProps[],
      totalSongs,
      totalPages: Math.ceil(totalSongs / pageSize),
      currentPage: page,
    };

    if (res && response) {
      await redis.set(
        paginatedCacheKey("songs", page, pageSize),
        JSON.stringify(response)
      );
    }

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting the songs");
  }
};

/**
 * Server action to get all the songs
 * @returns {songTileProps[]}
 */
export const getFeaturedSongs = async () => {
  try {
    const cachedFeaturedSongs = await redis.get(keys.FEATURED_SONG);

    if (cachedFeaturedSongs) {
      return JSON.parse(cachedFeaturedSongs) as songTileProps[];
    }

    const res = await db.song.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        Artist: true,
      },
    });

    await redis.set(keys.FEATURED_SONG, JSON.stringify(res));

    return res as songTileProps[];
  } catch (error) {
    console.log(error);
    throw new Error("Error getting the songs");
  }
};

/**
 * Server action to get all the songs
 * @returns {Artist[]}
 */
export const getFeaturedArtists = async () => {
  try {
    const cachedFeaturedArtists = await redis.get(keys.FEATURED_ARTIST);

    if (cachedFeaturedArtists) {
      return JSON.parse(cachedFeaturedArtists) as Artist[];
    }

    const res = await db.artist.findMany({
      where: {
        isFeatured: true,
      },
    });

    await redis.set(keys.FEATURED_ARTIST, JSON.stringify(res));

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting the artists");
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
    const cachedSongDetail = await redis.get(cacheKey("song", id));

    if (cachedSongDetail) {
      return JSON.parse(cachedSongDetail) as ISongDetail;
    }
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

    if (res) {
      await redis.set(cacheKey("song", id), JSON.stringify(res));
    }
    return res as ISongDetail;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting the song");
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
      throw new Error("You must be logged in to post comments");
    }
    await db.comment.create({
      data: {
        content,
        songId,
        userId,
      },
    });
    return {
      msg: "Successfully posted your thoughts!",
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
      throw new Error("Comment ID missing");
    }
    if (session?.user.id !== userId) {
      throw new Error("You cannot perform this action");
    }
    await db.comment.delete({
      where: {
        id,
      },
    });
    return {
      msg: "Comment deleted successfully!",
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action to get song by genre
 */
export const getSongsByGenre = async (
  genre: string,
  page: number = 1,
  pageSize: number = 10
) => {

  try {
    const skip = (page - 1) * pageSize;
    const cachedSongs = await redis.get(
      paginatedCacheKey(genre, page, pageSize)
    );

    if (cachedSongs) {
      return JSON.parse(cachedSongs) as paingatedSongs;
    }

    const res = await db.song.findMany({
      where: {
        genres: {
          some: {
            name: genre,
          },
        },
      },
      skip: skip,
      take: pageSize,
      include: {
        Artist: true,
        
      },
    });

    const totalSongs = await db.song.count({
      where: {
        genres: {
          some: {
            name: genre,
          },
        },
      },
    });

    
    const response = {
      songs: res as songTileProps[],
      totalSongs,
      totalPages: Math.ceil(totalSongs / pageSize),
      currentPage: page,
    };

    if (res && response) {
      await redis.set(
        paginatedCacheKey(genre, page, pageSize),
        JSON.stringify(response)
      );
    }

    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action to get song by artist
 */
export const getSongsByArtist = async (
  artistId: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    const skip = (page - 1) * pageSize;

    const cachedSongs = await redis.get(
      paginatedCacheKey(artistId, page, pageSize)
    );

    if (cachedSongs) {
      return JSON.parse(cachedSongs) as paingatedSongs;
    }

    const res = await db.song.findMany({
      where: {
        artistId,
      },
      skip: skip,
      take: pageSize,
      include: {
        Artist: true,
      },
    });

    const totalSongs = await db.song.count({
      where: {
        artistId,
      },
    });

    const response = {
      songs: res as songTileProps[],
      totalSongs,
      totalPages: Math.ceil(totalSongs / pageSize),
      currentPage: page,
    };

    if (res && response) {
      await redis.set(
        paginatedCacheKey(artistId, page, pageSize),
        JSON.stringify(response)
      );
    }

    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action to search song by name or lyrics
 */
export const searchSongsByName = async (query: string) => {
  try {
    const results = await db.song.findMany({
      take: 20,
      where: {
        OR: [{ title: { contains: query, mode: "insensitive" } }],
      },
      include: {
        Artist: true,
      },
    });
    return results as songTileProps[];
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * A server action to search song by artist name
 */
export const searchArtistByName = async (query: string) => {
  try {
    const results = await db.artist.findMany({
      take: 20,
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });
    return results;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

/**
 * Search song by song name or artist name
 * @param query 
 * @returns {
 * songs,
 * artists
 * }
 */
export const searchSongsAndArtistsByName = async (query: string) => {
  try {
    const [songs, artists] = await Promise.all([
      db.song.findMany({
        take: 20,
        where: {
          OR: [{ title: { contains: query, mode: "insensitive" } }],
        },
        include: {
          Artist: true,
        },
      }),
      db.artist.findMany({
        take: 20,
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      }),
    ]);

    return {
      songs: songs as songTileProps[],
      artists,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};


export interface IArtistDetails extends Artist {
  songs: Song[]
}

export const getArtistDetails = async (artistId: string) => {
  try {
    const artistDetails = await db.artist.findUnique({
      where: { id: artistId },
      include: {
        songs: {
          include: {
            genres: true,            
          },
        },
      },
    });

    if (!artistDetails) {
      throw new Error('Artist not found');
    }

    return artistDetails as IArtistDetails;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};