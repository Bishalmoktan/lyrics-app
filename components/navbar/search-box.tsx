'use client';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components//ui/command';
import { useState } from 'react';

const SearchBox = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center justify-between w-full dark:bg-transparent dark:hover:bg-brand-light dark:hover:border-transparent transition border border-zinc-300 border-solid border-1"
      >
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-200 dark:group-hover:text-zinc-200 transition">
          Search
        </p>
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-200" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen} >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Pop</CommandItem>
            <CommandItem>Rock</CommandItem>
            <CommandItem>Lofi</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
export default SearchBox;
