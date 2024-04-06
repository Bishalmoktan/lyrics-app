'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

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
import { Check, ChevronsUpDown } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '@/components/ui/multi-select';

import 'react-quill/dist/quill.snow.css';

const songs = [
  { label: 'Sajjan Raj Vaidya', value: 'sajjan' },
  { label: 'Sushant KC', value: 'sushant' },
  { label: 'John Chamling', value: 'john' },
  { label: 'Purna Rai', value: 'purna' },
] as const;

const genres = [
  { label: 'Pop', value: 'pop' },
  { label: 'Rock', value: 'rock' },
  { label: 'Folk', value: 'Folk' },
  { label: 'Lofi', value: 'lofi' },
];

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required.',
  }),
  artist: z.string().min(1, {
    message: 'Please select an Artist.',
  }),
  genre: z.array(z.string()).min(1, {
    message: 'Please select a genre.',
  }),
  description: z.string().min(1, {
    message: 'Lyrics cannot be empty',
  }),
});

export function AddSongForm() {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      artist: '',
      description: '',
      genre: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Hello, testing</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        ? songs.find((song) => song.value === field.value)
                            ?.label
                        : 'Select Artist'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="max-w-sm p-0">
                  <Command>
                    <CommandInput placeholder="Search artist..." />
                    <CommandEmpty>No artist found.</CommandEmpty>
                    <CommandList>
                      {songs.map((song) => (
                        <CommandItem
                          value={song.label}
                          key={song.value}
                          onSelect={() => {
                            form.setValue('artist', song.value);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              song.value === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {song.label}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the arist. Artist not found? Create here
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
              <FormLabel>Lyrics</FormLabel>
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
                        <MultiSelectorItem key={i} value={option.value}>
                          {option.label}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormDescription>Enter lyrics of the song.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* lyrics */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lyrics</FormLabel>
              <FormControl>
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

        <Button
          type="submit"
          className="bg-rose-500 hover:bg-rose-700 text-white hover:text-white"
        >
          Publish
        </Button>
      </form>
    </Form>
  );
}
