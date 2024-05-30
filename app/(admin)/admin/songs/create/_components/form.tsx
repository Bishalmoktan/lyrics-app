'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Upload } from 'lucide-react';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select';

import 'react-quill/dist/quill.snow.css';
import { postSong } from '@/lib/admin/actions';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';
import { Artist, Genre } from '@prisma/client';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Preview from '../../_components/preview';

export const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  songId: z.string().min(1, {
    message: 'Song id is required.',
  }),
  duration: z.string().min(1, {
    message: 'Duration cannot be empty.',
  }),
  story: z.string(),
  artist: z.string().min(1, {
    message: 'Please select an Artist.',
  }),
  genre: z.array(z.string()).min(1, {
    message: 'Please select a genre.',
  }),
  lyrics: z.string().min(1, {
    message: 'Lyrics cannot be empty',
  }),
  timestamp: z.string(),
  nepaliLyrics: z.string(),
});

interface AddSongFormProps {
  artists: Artist[];
  genres: Genre[];
}

export interface ILyricsJson {
  text: string;
  timestamp: number
}

export function AddSongForm({ artists, genres }: AddSongFormProps) {
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [lyricsWithTimestamps, setLyricsWithTimestamps] = useState<ILyricsJson[]>([]);

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      artist: '',
      duration: '',
      songId: '',
      lyrics: '',
      timestamp: '',
      story: '',
      nepaliLyrics: '',
      genre: [],
    },
  });

  const parseTimestamp = (timestamp: string) => {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      return -1;
    }
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  const handleLyricsChange = useCallback(() => {
    const lyricsLines = form.getValues('lyrics').split('<p>').map(line => line.replace('</p>', '').trim()).filter(line => line);
    const timestampsArray = form.getValues('timestamp').split('<p>').map(time => time.replace('</p>', '').trim()).filter(time => time).map(parseTimestamp);
    
    const lyrics = lyricsLines.map((line, index) => ({
      text: line,
      timestamp: timestampsArray[index],
    }));

    setLyricsWithTimestamps(lyrics);
  }, [form]);

  useEffect(() => {
    handleLyricsChange();
  }, [form.getValues('lyrics'), form.getValues('timestamp')]);


  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const lyricsJson = JSON.stringify({ lyrics: lyricsWithTimestamps });
    // if (thumbnail === '') {
    //   toast.error('Please upload a picture');
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const res = await postSong({ thumbnail, ...values });
    //   toast.success(res?.msg);
    //   router.refresh();
    // } catch (error: any) {
    //   toast.error(error.message);
    // } finally {
    //   form.reset();
    //   setLoading(false);
    //   setThumbnail('');
    // }
  }
  if (showForm) {
    return (
      <Form {...form}>
        <Button onClick={() => setShowForm(false)}>Preview</Button>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
          autoComplete="off"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg: Najeek"
                    className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter title of the song.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* songId */}
          <FormField
            control={form.control}
            name="songId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song Id</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg: qyRrUEInzAs"
                    className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can find it on the song url of youtube.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* duration */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Eg: 4:18"
                    className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can find duration of the song in youtube.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* story */}
          <FormField
            control={form.control}
            name="story"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song Story</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Eg: This is about situationship"
                    className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Note: You can add the story later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* artist  */}
          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Artist</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'max-w-sm justify-between bg-white text-gray-900 hover:bg-white hover:text-gray-500',
                          !field.value && 'text-gray-500'
                        )}
                      >
                        {field.value
                          ? artists.find((artist) => artist.id === field.value)
                              ?.name
                          : 'Select Artist'}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-sm p-0">
                    <Command>
                      <CommandInput placeholder="Search artist..." />
                      <CommandEmpty>
                        <span>Artist not found. </span>
                        <Link
                          href={'/admin/artists/create'}
                          className="underline"
                        >
                          Create Artist
                        </Link>
                      </CommandEmpty>
                      <CommandList>
                        {artists.map((artist) => (
                          <CommandItem
                            value={artist.name}
                            key={artist.id}
                            onSelect={() => {
                              form.setValue('artist', artist.id);
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                artist.id === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            <span> {artist.name}</span>
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  <span>Select the arist. Artist not found? </span>
                  <Link href={'/admin/artists/create'} className="underline">
                    Create here
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <MultiSelector
                    value={field.value}
                    onValueChange={field.onChange}
                    loop={false}
                    className="max-w-sm justify-between bg-white text-gray-900 hover:bg-white hover:text-gray-500"
                  >
                    <MultiSelectorTrigger>
                      <MultiSelectorInput
                        className="max-w-sm justify-between bg-white text-gray-900 hover:bg-white hover:text-gray-500"
                        placeholder="Choose the genre of the song"
                      />
                    </MultiSelectorTrigger>
                    <MultiSelectorContent>
                      <MultiSelectorList>
                        {genres.map((option, i) => (
                          <MultiSelectorItem key={i} value={option.name}>
                            {option.name}
                          </MultiSelectorItem>
                        ))}
                      </MultiSelectorList>
                    </MultiSelectorContent>
                  </MultiSelector>
                </FormControl>
                <FormDescription>
                  <span>Genre not found? </span>
                  <Link
                    className="underline cursor-pointer"
                    href={'/admin/genre/create'}
                  >
                    Create Genre
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* upload image widget  */}
          <div>
            <p>Thumbnail</p>
            <CldUploadWidget
              options={{
                folder: 'thumbnails',
              }}
              signatureEndpoint={'/api/sign-cloudinary-params'}
              onSuccess={(result) => {
                const info = result.info as CloudinaryUploadWidgetInfo;
                setThumbnail(info.secure_url);
              }}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => open()}
                    className="cursor-pointer text-gray-300"
                  >
                    <Upload className="size-16" />
                    <p>Upload image</p>
                  </div>
                );
              }}
            </CldUploadWidget>

            {thumbnail !== '' && (
              <Image
                src={thumbnail}
                alt="Preview Image"
                height={'400'}
                width={'600'}
              />
            )}
          </div>

          {/* lyrics */}
          <FormField
            control={form.control}
            name="lyrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lyrics</FormLabel>
                <FormControl>
                  {/* <Textarea 
                    placeholder="Eg: Najeek na aau..."
                  className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                  value={field.value}
                  onChange={field.onChange}
                  /> */}
                <ReactQuill
                    className="bg-white max-w-lg text-gray-900"
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Eg: Najeek na aau..."
                  />
                </FormControl>
                <FormDescription>Enter lyrics of the song.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* timestamp */}
          <FormField
            control={form.control}
            name="timestamp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timestamp</FormLabel>
                <FormControl>
                  {/* <Textarea 
                    placeholder="Eg: 00:00:20"
                  className="max-w-sm bg-white focus-visible:ring-transparent text-gray-900"
                  value={field.value}
                  onChange={field.onChange}
                  /> */}
                     <ReactQuill
                    className="bg-white max-w-lg text-gray-900"
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Eg: 00:00:12"
                  />
                
                </FormControl>
                <FormDescription>Note: You can add this later. </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* nepali lyrics  */}
          <FormField
            control={form.control}
            name="nepaliLyrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nepali Lyrics</FormLabel>
                <FormControl>
                  <ReactQuill
                    className="bg-white max-w-lg text-gray-900"
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Eg: नजिक नआउ.… "
                  />
                </FormControl>
                <FormDescription>
                  You can add nepali lyrics later. Note: This is optional
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            type="submit"
            className="bg-rose-500 hover:bg-rose-700 text-white hover:text-white"
          >
            Publish
          </Button>
        </form>
      </Form>
    );
  } else {
    return (
      <div>
        <Button onClick={() => setShowForm(true)}>Show Form</Button>
        <Preview
        timestamp={form.getValues('timestamp')}
          artist={form.getValues('artist')}
          genre={form.getValues('genre')}
          lyrics={form.getValues('lyrics')}
          songId={form.getValues('songId')}
          story={form.getValues('story')}
          title={form.getValues('title')}
          nepaliLyrics={form.getValues('nepaliLyrics')}
          duration={form.getValues('duration')}
          thumbnail={thumbnail}
          artists={artists}
          jsonLyrics={lyricsWithTimestamps}
        />
      </div>
    );
  }
}
